import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

const ButtonGeneral = (props) => {
    let { type, content, onClickBtn, enable, icon } = props

    const handleClickBtn = () => {
        onClickBtn()
    }

    return (
        <Button
            className={`flex items-center gap-4 btn-general ${enable === false ? 'disabled' : ''}`}
            onClick={handleClickBtn}
            variant={type}
        >
            {content} {icon}
        </Button>
    )
}

export default ButtonGeneral
