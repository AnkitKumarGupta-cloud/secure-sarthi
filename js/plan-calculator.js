/**
 * Secure Sarthi — Plan Calculator (approximate estimates only)
 *
 * Every plan detail page defines a `window.PLAN_CALC_CONFIG` object before
 * loading this script. This file reads that config, renders the right input
 * fields for the plan type, and computes a rough premium/maturity estimate
 * using widely-published approximate LIC rate ranges — NOT official
 * actuarial tables. The output is always labelled as an estimate.
 *
 * Config shape:
 * {
 *   type: "term" | "endowment" | "moneyback" | "child" | "wholelife" | "pension",
 *   minAge: number, maxAge: number,
 *   minTerm: number, maxTerm: number,   // omitted for pension (no term)
 *   fixedTerms: [n, n, ...],            // optional — plan only offers specific terms (e.g. Jeevan Labh: 16/21/25)
 *   minSA: number,                      // minimum sum assured in rupees
 *   defaultSA: number,                  // sensible default to pre-fill
 *   bonusRate: number,                  // approx ₹ per ₹1,000 SA per year (for endowment/moneyback/child/wholelife)
 *   fabRate: number,                    // approx one-time Final Additional Bonus ₹ per ₹1,000 SA (0 if term < 15yrs typically)
 *   guaranteedAdditionRate: number      // for GA-style plans (Bima Jyoti, Amritbaal) instead of bonusRate
 * }
 */
(function () {
  var cfg = window.PLAN_CALC_CONFIG;
  if (!cfg) return;

  function formatINR(n) {
    n = Math.round(n);
    var s = n.toString();
    var lastThree = s.slice(-3);
    var rest = s.slice(0, -3);
    if (rest !== "") lastThree = "," + lastThree;
    return "₹" + rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  }

  function showError(msg) {
    var err = document.getElementById("calc-error");
    err.textContent = msg;
    err.classList.add("show");
    document.getElementById("calc-result").classList.remove("show");
  }

  function clearError() {
    document.getElementById("calc-error").classList.remove("show");
  }

  // Rough term-insurance premium approximation: premium per lakh of cover
  // rises with age. These bands are loosely based on publicly published
  // LIC Jeevan Amar / Tech Term illustrative rates (non-smoker) and are
  // only meant to give a ballpark, not a quote.
  function approxTermPremiumPerLakh(age) {
    if (age < 25) return 90;
    if (age < 30) return 110;
    if (age < 35) return 150;
    if (age < 40) return 210;
    if (age < 45) return 300;
    if (age < 50) return 430;
    if (age < 55) return 620;
    if (age < 60) return 880;
    return 1250;
  }

  function calcTerm(age, sa, term) {
    var perLakh = approxTermPremiumPerLakh(age);
    var annualPremium = (sa / 100000) * perLakh;
    return {
      annualPremium: annualPremium,
      totalPaid: annualPremium * term,
      payout: sa,
      payoutLabel: "Cover Amount (if claim arises)"
    };
  }

  function calcBonusStyle(age, sa, term, cfg) {
    // Endowment / money-back / child / whole-life: premium is estimated
    // backward from typical LIC gross premium rates (~35-55 per 1000 SA
    // per year for a 20-25yr endowment, adjusted lightly for age), and
    // maturity = SA + (bonusRate/1000 * SA * term) + FAB.
    var basePerThousand = 42 + Math.max(0, age - 30) * 0.35; // gentle age slope
    var annualPremium = (sa / 1000) * basePerThousand;
    var bonusRate = cfg.bonusRate || 0;
    var fabRate = term >= 15 ? (cfg.fabRate || 0) : 0;
    var accumulatedBonus = (sa / 1000) * bonusRate * term;
    var fab = (sa / 1000) * fabRate;
    var maturity = sa + accumulatedBonus + fab;
    return {
      annualPremium: annualPremium,
      totalPaid: annualPremium * term,
      payout: maturity,
      payoutLabel: "Estimated Maturity Amount"
    };
  }

  function calcGuaranteedAddition(age, sa, term, cfg) {
    var gaRate = cfg.guaranteedAdditionRate || 0;
    var basePerThousand = 38 + Math.max(0, age - 30) * 0.3;
    var annualPremium = (sa / 1000) * basePerThousand;
    var accumulatedGA = (sa / 1000) * gaRate * term;
    var maturity = sa + accumulatedGA;
    return {
      annualPremium: annualPremium,
      totalPaid: annualPremium * term,
      payout: maturity,
      payoutLabel: "Estimated Maturity Amount"
    };
  }

  function calcPension(age, purchasePrice) {
    // Very rough immediate-annuity yield approximation: ~6-7% of purchase
    // price annually, rising slightly with age (annuity rates improve
    // with age since payout period is expected to be shorter).
    var yieldPct = 6 + Math.max(0, age - 40) * 0.03;
    yieldPct = Math.min(yieldPct, 9);
    var annualPension = purchasePrice * (yieldPct / 100);
    return {
      annualPension: annualPension,
      monthlyPension: annualPension / 12,
      purchasePrice: purchasePrice
    };
  }

  function render() {
    var root = document.getElementById("plan-calc-root");
    if (!root) return;

    var isPension = cfg.type === "pension";
    var fields = "";

    fields += '<div class="calc-field"><label for="calc-age">Your Age</label>' +
      '<input type="number" id="calc-age" min="' + cfg.minAge + '" max="' + cfg.maxAge + '" value="' + Math.round((cfg.minAge + cfg.maxAge) / 2) + '"/></div>';

    if (isPension) {
      fields += '<div class="calc-field"><label for="calc-sa">Purchase Price (₹)</label>' +
        '<input type="number" id="calc-sa" min="' + cfg.minSA + '" step="10000" value="' + cfg.defaultSA + '"/></div>';
    } else {
      fields += '<div class="calc-field"><label for="calc-sa">Sum Assured (₹)</label>' +
        '<input type="number" id="calc-sa" min="' + cfg.minSA + '" step="50000" value="' + cfg.defaultSA + '"/></div>';

      if (cfg.fixedTerms && cfg.fixedTerms.length) {
        var opts = cfg.fixedTerms.map(function (t) {
          return '<option value="' + t + '">' + t + ' years</option>';
        }).join("");
        fields += '<div class="calc-field"><label for="calc-term">Policy Term</label>' +
          '<select id="calc-term">' + opts + '</select></div>';
      } else if (cfg.minTerm && cfg.maxTerm) {
        var midTerm = Math.round((cfg.minTerm + cfg.maxTerm) / 2);
        fields += '<div class="calc-field"><label for="calc-term">Policy Term (Years)</label>' +
          '<input type="number" id="calc-term" min="' + cfg.minTerm + '" max="' + cfg.maxTerm + '" value="' + midTerm + '"/></div>';
      }
    }

    root.innerHTML =
      '<h2>Estimate Your Numbers</h2>' +
      '<p class="calc-sub">Enter your details for a rough estimate — not an official quote.</p>' +
      '<div class="calc-fields">' + fields + '</div>' +
      '<button type="button" class="calc-btn" id="calc-run-btn">Calculate</button>' +
      '<div class="calc-error" id="calc-error"></div>' +
      '<div class="calc-result" id="calc-result"></div>' +
      '<p class="calc-disclaimer">This is an approximate, illustrative estimate based on typical published rate ranges — not an official LIC quotation. Actual premiums and payouts depend on medical underwriting, gender, policy variant, and LIC\'s actuarial tables at the time of purchase. <a href="index.html#contact">Get in touch</a> for an accurate, personalised quote.</p>';

    document.getElementById("calc-run-btn").addEventListener("click", function () {
      clearError();
      var age = parseInt(document.getElementById("calc-age").value, 10);

      if (isNaN(age) || age < cfg.minAge || age > cfg.maxAge) {
        showError("Please enter an age between " + cfg.minAge + " and " + cfg.maxAge + " for this plan.");
        return;
      }

      var saInput = document.getElementById("calc-sa");
      var sa = parseFloat(saInput.value);
      if (isNaN(sa) || sa < cfg.minSA) {
        showError("Minimum " + (isPension ? "purchase price" : "sum assured") + " for this plan is " + formatINR(cfg.minSA) + ".");
        return;
      }

      var resultEl = document.getElementById("calc-result");

      if (isPension) {
        var pensionResult = calcPension(age, sa);
        resultEl.innerHTML =
          '<div class="calc-result-grid">' +
            '<div class="calc-result-item"><div class="calc-result-label">Est. Annual Pension</div><div class="calc-result-value">' + formatINR(pensionResult.annualPension) + '</div></div>' +
            '<div class="calc-result-item"><div class="calc-result-label">Est. Monthly Pension</div><div class="calc-result-value">' + formatINR(pensionResult.monthlyPension) + '</div></div>' +
          '</div>';
        resultEl.classList.add("show");
        return;
      }

      var termEl = document.getElementById("calc-term");
      var term = termEl ? parseInt(termEl.value, 10) : (cfg.minTerm || 20);

      if (cfg.minTerm && cfg.maxTerm && !cfg.fixedTerms && (isNaN(term) || term < cfg.minTerm || term > cfg.maxTerm)) {
        showError("Please enter a policy term between " + cfg.minTerm + " and " + cfg.maxTerm + " years.");
        return;
      }

      var result;
      if (cfg.type === "term") {
        result = calcTerm(age, sa, term);
      } else if (cfg.type === "guaranteed") {
        result = calcGuaranteedAddition(age, sa, term, cfg);
      } else {
        result = calcBonusStyle(age, sa, term, cfg);
      }

      var html = '<div class="calc-result-grid">' +
        '<div class="calc-result-item"><div class="calc-result-label">Est. Annual Premium</div><div class="calc-result-value">' + formatINR(result.annualPremium) + '</div></div>' +
        '<div class="calc-result-item"><div class="calc-result-label">Est. Total Paid Over ' + term + ' Yrs</div><div class="calc-result-value">' + formatINR(result.totalPaid) + '</div></div>' +
        '<div class="calc-result-item"><div class="calc-result-label">' + result.payoutLabel + '</div><div class="calc-result-value">' + formatINR(result.payout) + '</div></div>' +
        '</div>';
      resultEl.innerHTML = html;
      resultEl.classList.add("show");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
