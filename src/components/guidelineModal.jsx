import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import ButtonGeneral from './buttons.jsx'
import Markdown from 'react-markdown'

const markdown = `# How to add a proxy
## Step 1: Click Add button

![step1](https://i.postimg.cc/B62zmmLx/step1.png)

## Step 2: Fill the form and click Add button

**Fields syntax**

- \`node: /<some-node>\` 
- \`target: <some-domain>\`

![step2](https://i.postimg.cc/zB17GWp7/Screenshot-from-2024-01-15-19-49-26.png)


## Step 3: Enter password and click Save
Contact our team for password
![step3](https://i.postimg.cc/wMkgGh4G/Screenshot-from-2024-01-15-19-51-54.png)


## Finalize
![Finalize](https://i.postimg.cc/HkdBmbZt/finalize.png)

After add proxy, you got a URL, all requests through this URL will be routed to target (here is https://forum.uit.edu.vn).
Example:

- https://api-proxy.digitalauto.asia/forum/node/567584#post567644  will be routed to: https://forum.uit.edu.vn/node/567584#post567644`

const GuidelineModal = (props) => {
    let { showModal, handleClose } = props

    const handleCloseModal = () => {
        handleClose()
    }

    return (
        <Modal show={showModal} onHide={() => handleCloseModal()} className='modal-general'>
            <Modal.Header closeButton>
                <Modal.Title>Proxy guideline</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Markdown>{markdown}</Markdown>
            </Modal.Body>
            <Modal.Footer>
                <ButtonGeneral type='secondary' content='Close' onClickBtn={handleClose}></ButtonGeneral>
            </Modal.Footer>
        </Modal>
    )
}

export default GuidelineModal
