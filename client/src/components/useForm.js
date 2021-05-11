import {useState} from 'react'

const useForm = () => {

    //created custom hooks different from my hooks in appState to keep code DRY ask me if unclear 
    
    const [state, setState] = useState({})
    const handleChange = e => {
        e.persist()
        const {name, value} = e.target
        setState(state => ({ ...state, [name]: value }))
    }
    return [state, handleChange]
}

export default useForm
