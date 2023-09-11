import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchBar = (props) => {

    const {onChangeSearchBarTxt} = props;

    const changeSearchBarTxt = (searchValue) => {
        onChangeSearchBarTxt(searchValue);
    }

    return (
        <InputGroup className="mb-3">
            <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                placeholder='Enter node to search'
                onChange={(e) => changeSearchBarTxt(e.target.value)}
            />
        </InputGroup>
    )
}

export default SearchBar;