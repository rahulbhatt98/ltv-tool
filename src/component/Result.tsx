import { useSelector } from 'react-redux'
import { loanToValueSelector } from '../slices/loanToValue'
import ReactTooltip from "react-tooltip"
import NumberFormat from 'react-number-format'

const Result = () => {
    const { loanToValue } = useSelector(loanToValueSelector);
    return (
        <>
            <div className="loan-graphics-row">

                <div className="loan-percentage-col ">
                    <div className="loan-per-sec">
                        <div className="loan-per-img"><img src={process.env.PUBLIC_URL +'/img/min-img.svg'} /></div>
                        <div className="loan-per-per"><h3>{`${loanToValue.minimumPercent}%`}</h3><img src={process.env.PUBLIC_URL +'/img/min-img-coin.svg'} /></div>
                    </div>                        
                    <p> <b>Minimum Loan </b> facility* </p>
                    <p className="price">
                        <NumberFormat
                            value={loanToValue.minimum}
                            className="foo"
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'£ '}
                        />
                    </p>

                </div>
                <div className="loan-percentage-col ">
                    <div className="loan-per-sec">
                        <div className="loan-per-img"><img src={process.env.PUBLIC_URL +'/img/med-img.svg'} /></div>
                        <div className="loan-per-per"><h3>{`${loanToValue.healthyPercent}%`}</h3><img src={process.env.PUBLIC_URL +'/img/med-img-coin.svg'} /></div>
                    </div> 

                    <p> <b> Maximum Loan </b> for an healthy client </p>
                    {/* <p className="price"> {`£${loanToValue.healthy}`}</p> */}
                    <p className="price">
                        <NumberFormat
                            value={loanToValue.healthy}
                            className="foo"
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'£ '}
                        />
                    </p>

                </div>

                <div className="loan-percentage-col ">
                    <div className="loan-per-sec">
                        <div className="loan-per-img"><img src={process.env.PUBLIC_URL +'/img/max-img.svg'} /></div>
                        <div className="loan-per-per"><h3>{`${loanToValue.unhealthyPercent}%`}</h3><img src={process.env.PUBLIC_URL +'/img/max-img-coin.svg'} /></div>
                    </div> 

                    <p> <b> Maximum Loan </b> for an unhealthy client </p>
                    <p className="price">
                        <NumberFormat
                            value={loanToValue.unhealthy}
                            className="foo"
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'£ '}
                        />
                        <svg className="tooltip-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                            viewBox="0 0 22 22" fill="none" data-toggle="tooltip" data-placement="top" data-tip data-for="registerTip">
                            <circle cx="11" cy="11" r="11" fill="#1b1f4d" />
                            <path
                                d="M10.2658 17H12.7298V9.048H10.2658V17ZM11.4978 7.928C12.3138 7.928 12.8898 7.432 12.8898 6.648C12.8898 5.88 12.3138 5.384 11.4978 5.384C10.6818 5.384 10.1058 5.88 10.1058 6.648C10.1058 7.432 10.6818 7.928 11.4978 7.928Z"
                                fill="white" />
                            <defs>
                                <linearGradient id="paint0_linear" x1="10.9999" y1="22.0005"
                                    x2="10.9999" y2="0.000537634" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#921D80" />
                                    <stop offset="1" stop-color="#9F4EB0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </p>
                    <ReactTooltip id="registerTip" place="bottom" effect="solid">
                        <p>
                            It is possible to reach much higher LTVs based on the medical background of the
                            client. A set of simple medical and lifestyle-related questions are used to work out
                            an enhanced LTV rate. Actual rates will vary according to the specific medical
                            underwriting of each client.
                        </p>
                    </ReactTooltip>
                </div>

            </div>
        </>
    )
}

export default Result
