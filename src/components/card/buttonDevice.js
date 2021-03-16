import React, {useState} from 'react'
import Button from  '@material-ui/core/Button' 

function ButtonDevice(props){
	const [currency, setCurrency] = useState("USD")
	const device = [ "USD", "EUR", "CHF", "CNY", "MUR", "MGA", "CAD" , "COP"]
	const  handleClickCurrency=(e)=>{
		let temp =  Math.floor(Math.random() * Math.floor(device.length))	
	setCurrency(device[temp])
	}	 
	return(
		<>
		<div>
			<Button onClick = {handleClickCurrency}>faites Varier les valeurs:{currency}</Button>
		</div>
		</>
	)
}
export default  ButtonDevice
