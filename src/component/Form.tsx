import React from 'react';
import { useEffect } from 'react';
import { useRanger } from 'react-ranger';
import NumberFormat from 'react-number-format'
import { useDispatch } from 'react-redux'
import { calculateLoan } from '../slices/loanToValue'
import styled from "styled-components";


export const Track = styled("div")`
  display: inline-block;
  height: 8px;
  width: 90%;
  margin: 0 5%;
`;

export const Handle = styled("div")`
  background: #48af66;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 30px;
  font-size: 14px;
  position: relative;
  top: -40px;
  left: -15px;
  white-space: nowrap;
  color: white;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const Form = () => {
    const [values, setValues] = React.useState([55]);
    const [home, setHome] = React.useState('70000');

    const { getTrackProps, handles } = useRanger({
        values,
        onChange: setValues,
        min: 55,
        max: 100,
        stepSize: 1,
        onDrag: setValues
    })
    console.log(home);
    console.log(values);

    const dispatch = useDispatch();

    const handleChange = () => {
        dispatch(calculateLoan(values, home));
    }

    useEffect(() => {

        dispatch(calculateLoan(values, home));

    }, [values, home])

    return (
        <>
            <div className="client-details-row">
                <h3><img src={process.env.PUBLIC_URL + '/img/client-details-icon.svg'} /> Client Details</h3>
                <div className="details-row">

                    <div className="details-age">
                        <p> Age (youngest if couple): </p>

                        <div className="details-age-slider"
                            {...getTrackProps({
                                style: {
                                    height: '4px',
                                },
                            })}
                            onChange={handleChange}
                        >
                            {handles.map(({ getHandleProps, value }) => (
                                <button
                                    {...getHandleProps({
                                        style: {
                                            background: '#48af66',
                                        },
                                    })}
                                >
                                    <Handle >{value}</Handle>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="details-value">
                        <p> Value of Home </p>
                        <NumberFormat
                            value={home || null}
                            prefix="£ "
                            placeholder="£ "
                            thousandSeparator={true}
                            allowNegative={false}
                            maxLength={15}
                            decimalScale={2}
                            onValueChange={values => setHome(values.value)}
                        />
                        {((Number(home) < 70000) || (!Number(home))) ?
                            <>
                                <div className="price_error">
                                    The minimum house value required is £70,000
                                </div>
                            </> :
                            ''}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form
