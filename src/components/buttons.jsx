import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const ButtonGeneral = (props) => {

    let {type, content, onClickBtn, enable} = props;

    const handleClickBtn = () => {
        onClickBtn();
    }

    return (
        <Button className={`btn-general ${enable === false ? 'disabled' : ''}`} onClick={handleClickBtn} variant={type}>{content}</Button>
    )
}

export default ButtonGeneral;