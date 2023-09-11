import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const ButtonGeneral = (props) => {

    let {type, content, onClickBtn} = props;

    const handleClickBtn = () => {
        onClickBtn();
    }

    return (
        <Button className='btn-general' onClick={handleClickBtn} variant={type}>{content}</Button>
    )
}

export default ButtonGeneral;