"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance_value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login_btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".sort_btn");
const btnLogout = document.querySelector(".logout_link");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPass = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form_input_transferTo");
const inputTransferAmount = document.querySelector(".form_input_amount");
const inputLoanNumber = document.querySelector(".form_input_loan_number");
const inputClosingUserName = document.querySelector(".form_input_cnfUser");
const inputClosingPin = document.querySelector(".form_input_cnfPIN");

let loggedInUserAccount;

if (window.localStorage.getItem("loggedInUserAccount") != null) {
  loggedInUserAccount = JSON.parse(
    window.localStorage.getItem("loggedInUserAccount")
  );
  console.log(`loggedInUserAccount is ${loggedInUserAccount}`);
}

if (loggedInUserAccount && containerMovements) {
  labelWelcome.textContent = `Welcome ${loggedInUserAccount.owner}`;
  const displayMovements = function (movementsArr) {
    containerMovements.innerHTML = "";

    movementsArr.forEach(function (mov, index) {
      const transType = mov > 0 ? "deposit" : "withdrawal";
      const html = `
          <div class="movement_row">
          <div class="movement_type movement_type_${transType}">${
        index + 1
      } ${transType}</div>
          <div class="movement_date">12/03/2020</div>
          <div class="movement_value">${mov}</div>
        </div>
          `;
      containerMovements.insertAdjacentHTML("afterbegin", html);
    });
  };
  displayMovements(loggedInUserAccount.movements);
}

//['js', 'jd', 'stw', 'ss']

const createUserNameArr = function (accounts) {
  accounts.forEach((account) => {
    //account.owner="jonas schmidt"
    //["jonas", "schmidt"]// ['j', 's']//js
    const userName = account.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
    account.userName = userName;
  });
};

createUserNameArr(accounts);

if (loggedInUserAccount && labelBalance) {
  const calculateBalance = function (movementsArr) {
    const balance = movementsArr.reduce(function (totalBal, currentMov) {
      return totalBal + currentMov;
    }, 0);
    labelBalance.textContent = `${balance} EUR`;
  };
  calculateBalance(loggedInUserAccount.movements);
}

if (loggedInUserAccount && labelSumIn) {
  const calculateDisplaySummary = function (movementsArr) {
    //[3000, 1300, 70...]
    const depositSumm = movementsArr
      .filter((mov) => mov > 0)
      .reduce(function (acc, curr) {
        return acc + curr;
      }, 0);
    labelSumIn.textContent = `${depositSumm}€`;

    const withdrawalSumm = movementsArr
      .filter((mov) => mov < 0)
      .reduce(function (acc, curr) {
        return acc + curr;
      }, 0);
    labelSumOut.textContent = `${Math.abs(withdrawalSumm)}€`;
  };
  calculateDisplaySummary(loggedInUserAccount.movements);
}

if (btnLogin) {
  btnLogin.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      const currentAcct = accounts.find(
        (acc) => acc.userName === inputLoginUsername.value
      );
      console.log(currentAcct);
      if (currentAcct?.pin === Number(inputLoginPass.value)) {
        window.localStorage.setItem(
          "loggedInUserAccount",
          JSON.stringify(currentAcct)
        );
        location.href = "homePage.html";
      } else {
        alert("Incorrect Username or password");
      }
    },
    false
  );
}

if (btnLogout) {
  btnLogout.addEventListener("click", function () {
    window.localStorage.removeItem("loggedInUserAccount");
    console.log("Localstorage empty");
  });
}
