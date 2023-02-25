const styleClass = `w-full p-1 text-gray-800 border focus:border focus:outline-0 rounded-md ease-linear transition-all duration-200`

function CustomInput({objValue, onChange, index, errorMsg}){
    const { label, type, value, required } = objValue;    
    return (
        <div className=" my-4">
            <h4 className=" text-sm font-light text-gray-500">
                {label[0].toUpperCase() + label.substring(1)}
                {required && <span className=" font-bold text-black"> &#42;</span>}
            </h4>

            <input
                type = {type}
                value = {value}
                autoFocus = {true}
                onChange = {(event) => onChange(event, index)}
                className = {`form-input ${styleClass} ${errorMsg.styleTextBox(objValue)}`}
            />

            {required && <p style={errorMsg.styleText}>{!value && errorMsg.text}</p>}
        </div>
    )
}

function checkErrorForm(error){
    const errorMsg = {
        text: 'This field is required!',
        styleText: {
            color: 'rgb(239, 68, 68)',
            fontSize: '10.5px',
            marginBottom: '8px',
            display: error ? 'block' : 'none',
        },
        styleTextBox: function({value, condition, required}){
            return (
                (error && ((required && !value) || !condition)) ?
                `border-red-400 hover:border-red-600 focus:border-red-600` :
                `border-gray-300 hover:border-gray-600 focus:border-gray-500`
            )
        }
    }
    
    return { errorMsg }
}

export { checkErrorForm, CustomInput, styleClass }