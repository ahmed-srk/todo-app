const styleClass = `w-full p-1 text-gray-800 focus:ring-0 rounded-md border border-gray-200 focus:border-gray-400 hover:border-gray-300`

function CustomInput({objValue, onChange, index, errorMsg}){
    const { label, type, value } = objValue;

    return (
        <div className=" my-2">
            <h4 className=" text-sm font-light text-gray-500">{label[0].toUpperCase() + label.substring(1)} <span className=" font-bold text-black">&#42;</span></h4>
            <input
                type = {type}
                value = {value}
                onChange = {(event) => onChange(event, index)}
                className = {`form-input ${styleClass}`}
                style = {errorMsg.styleTextBox(value)}
            />
            <p style={errorMsg.styleText}>{!value && errorMsg.text}</p>
        </div>
    )
}

function checkErrorForm(error){
    const errorMsg = {
        text: 'This field is required!',
        styleText: {
            color: 'rgb(239, 68, 68)',
            fontSize: '10.5px',
            lineHeight: '12px',
            display: error ? 'block' : 'none',
        },
        styleTextBox: function(property){
            return !property ? { borderColor: error && 'rgb(239, 68, 68)' } : {}
        }
    }
    
    return { errorMsg }
}

export { checkErrorForm, CustomInput, styleClass }