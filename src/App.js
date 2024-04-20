import React, { useReducer } from "react";

const initialState = {
    balance: 0,
    loan: 0,
    isActive: false,
};

function bankAccountReducer(state, action) {
    if (!state.isActive && action.type !== "openAccount") {
        return state;
    }
    switch (action.type) {
        case "openAccount":
            return { ...state, isActive: true, balance: 500 };
        case "deposit":
            return { ...state, balance: state.balance + action.amount };
        case "withdraw":
            return { ...state, balance: state.balance - action.amount };
        case "requestLoan":
            if (state.loan === 0) {
                return {
                    ...state,
                    balance: state.balance + action.amount,
                    loan: action.amount + action.amount * action.interestRate,
                };
            }
            return state;
        case "payLoan":
            return {
                ...state,
                balance: state.balance - state.loan,
                loan: 0,
            };
        case "closeAccount":
            if (state.loan === 0 && state.balance === 0) {
                return { ...initialState };
            }
            return state;
        default:
            return state;
    }
}

export default function App() {
    const [{ balance, loan, isActive }, dispatch] = useReducer(
        bankAccountReducer,
        initialState
    );
    return (
        <div className="App">
            <h1>useReducer Bank Account</h1>
            <p className="accountDetails">Balance: {balance}</p>
            <p className="accountDetails">Loan: {loan}</p>

            <p>
                <button
                    onClick={() => dispatch({ type: "openAccount" })}
                    disabled={isActive}
                >
                    Open account
                </button>
            </p>
            <p>
                <button
                    onClick={() => dispatch({ type: "deposit", amount: 150 })}
                    disabled={!isActive}
                >
                    Deposit 150
                </button>
            </p>
            <p>
                <button
                    onClick={() => dispatch({ type: "withdraw", amount: 50 })}
                    disabled={!isActive}
                >
                    Withdraw 50
                </button>
            </p>
            <p>
                <button
                    onClick={() =>
                        dispatch({
                            type: "requestLoan",
                            amount: 5000,
                            interestRate: 0.1,
                        })
                    }
                    disabled={loan ? true : !isActive}
                >
                    Request a loan of 5000
                </button>
            </p>
            <p>
                <button
                    onClick={() => dispatch({ type: "payLoan" })}
                    disabled={!loan}
                >
                    Pay loan
                </button>
            </p>
            <p>
                <button
                    onClick={() => dispatch({ type: "closeAccount" })}
                    disabled={!isActive}
                >
                    Close account
                </button>
            </p>
        </div>
    );
}
