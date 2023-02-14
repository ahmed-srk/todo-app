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

const styleClass = `w-full p-1 text-gray-800 focus:ring-0 rounded-md border border-gray-200 focus:border-gray-400 hover:border-gray-300`

export { checkErrorForm, styleClass }