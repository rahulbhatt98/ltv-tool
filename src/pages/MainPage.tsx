import Form from '../component/Form'
import Result from '../component/Result'

const MainPage = () => {
    return (
        <>
            <section className="loan-value-calculator">
                <div className="container">
                <h1> Loan-to-Value calculator </h1>

                <Form/>

                <Result/>
          
                <small className ="bottom-text">*subject to minimum initial release of £10,000</small>
                </div>
            </section>
        </>
    )
}

export default MainPage
