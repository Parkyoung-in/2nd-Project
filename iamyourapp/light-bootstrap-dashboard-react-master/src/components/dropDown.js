
import {
    MDBBadge,
    MDBListGroup,
    MDBListGroupItem,
    MDBCol,
    MDBRow,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBBtn
} from 'mdb-react-ui-kit';

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    Dropdown
} from "react-bootstrap";
export default function DropDown() {
    return (
        <Dropdown className="float-right" >
            <Dropdown.Toggle
                aria-expanded={false}
                aria-haspopup={true}
                as={Nav.Link}
                data-toggle="dropdown"
                id="navbarDropdownMenuLink"
                variant="default"
                className="m-0"
            >
                <span className="no-icon">3층</span>
            </Dropdown.Toggle>
            <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                >
                    1층
                </Dropdown.Item>
                <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                >
                    2층
                </Dropdown.Item>
                <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                >
                    3층
                </Dropdown.Item>

            </Dropdown.Menu>
        </Dropdown>
    );
}

