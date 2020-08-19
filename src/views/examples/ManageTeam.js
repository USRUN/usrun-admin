import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Button,
  CardBody,
  Modal,
  Col,
} from "reactstrap";
import ManageTeamTableItem from "../../components/ManageTeam/ManageTeamTableItem";
import "../../assets/scss/usrun-custom/toggle.scss";
import TeamService from "services/TeamService";
import { store } from 'react-notifications-component';

const ManageTeam = () => {
  const [cur, setCur] = useState(1);
  const limit = 10;

  const [teams, setTeams] = useState([]);
  const [searchedTeam, setSearchedTeam] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [province, setProvince] = useState("");

  const onCreateTeam = async (e) => {
    e.preventDefault();
    if(ownerId === "" || teamName === "" || province === "") {
      store.addNotification({
        title: "Lỗi",
        message: "Nội dung các trường dữ liệu không được phép trống",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
      return;
    }
    const response = await TeamService.createTeam(ownerId, teamName, parseInt(province));
    if(response.code === 0) {
      store.addNotification({
        title: "Thông báo",
        message: "Bạn đã tạo đội thành công",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
      toggleModal();
    } else {
      store.addNotification({
        title: "Lỗi",
        message: response.errorMessage,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    }
  }

  const loadPage = async (keyword, offset, limit) => {
    setTeams(await TeamService.getAllTeam(keyword, offset, limit));
  };

  useEffect(() => {
    loadPage(searchedTeam, cur, limit);
  }, [searchedTeam, cur]);

  const handlePaginationClick = async (changeAmount) => {
    await setCur(cur + changeAmount);
    loadPage(cur + changeAmount, limit);
  };

  // const handleUserSearch = async (e) => {
  //   if(searchString === null) return;
  //   if(searchString === ""){
  //     setIsSearching(false);
  //     setCur(1);
  //     loadPage(1,limit);
  //   }

  //   userList = await UserService.findUsers(searchString, 1, limit);

  //   if (userList != null) {
  //     setTableItems([].concat(getTableItems(userList)));
  //     setCur(1);
  //     setIsSearching(true);
  //   }
  // };

  const [formModal, setFormModal] = useState(false);

  const toggleModal = () => {
    setFormModal(!formModal);
  };

  return (
    <Container className="mt-3" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0 d-flex">
              <h3 className="mb-0 d-inline-block my-auto">Quản lý đội nhóm</h3>
              <Form
                className="form-inline my-auto ml-auto"
                onSubmit={(e) => {
                  e.preventDefault();
                  // handleUserSearch(e);
                }}
              >
                <Button color="warning" type="button" onClick={toggleModal}>
                  Tạo mới
                </Button>
                <FormGroup className="mb-0">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Tìm kiếm đội nhóm"
                      type="text"
                      onChange={(e) => {
                        e.preventDefault();
                        setSearchedTeam(e.target.value);
                      }}
                      onSubmit={(e) => {
                        console.log(e);
                      }}
                    />
                  </InputGroup>
                </FormGroup>
              </Form>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Tỉnh</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((item, index) => (
                  <ManageTeamTableItem
                    key={index}
                    {...item}
                  ></ManageTeamTableItem>
                ))}
              </tbody>
            </Table>
            <CardFooter className="py-4">
              <nav aria-label="...">
                <Pagination
                  className="pagination justify-content-end mb-0"
                  listClassName="justify-content-end mb-0"
                >
                  <PaginationItem className={cur === 1 ? "disabled" : ""}>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePaginationClick(-1);
                      }}
                      tabIndex="-1"
                    >
                      <i className="fas fa-angle-left" />
                      <span className="sr-only">Previous</span>
                    </PaginationLink>
                  </PaginationItem>{" "}
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePaginationClick(1);
                      }}
                    >
                      <i className="fas fa-angle-right" />
                      <span className="sr-only">Next</span>
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </nav>
            </CardFooter>
            <Modal
              className="modal-dialog-centered"
              size="sm"
              isOpen={formModal}
              toggle={toggleModal}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <h2>Tạo mới đội nhóm</h2>
                    </div>
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="ID đội trưởng"
                            value={ownerId}
                            required
                            onChange={(e) => setOwnerId(e.target.value)}
                            type="text"
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-books" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Tên đội"
                            value={teamName}
                            required
                            onChange={(e) => setTeamName(e.target.value)}
                            type="text"
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-pin-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Tỉnh"
                            min="0"
                            value={province}
                            required
                            onChange={(e) => setProvince(e.target.value)}
                            type="number"
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="text-center">
                        <Button color="warning" type="button" onClick={onCreateTeam}>
                          Tạo mới
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            </Modal>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default ManageTeam;
