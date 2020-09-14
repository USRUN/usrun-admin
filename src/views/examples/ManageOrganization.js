import React, { useState, useEffect } from "react";

// reactstrap components
import {
    Card,
    Container,
    Form,
    FormGroup,
    Modal,
    CardBody,
    Input,
    Button,
} from "reactstrap";
import "../../assets/scss/usrun-custom/toggle.scss";
import organizationService from "services/OrganizationService";
import ImageUploader from 'react-images-upload';
import DataTable from 'react-data-table-component';
import { store } from 'react-notifications-component';

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const ManageUser = () => {
    const [listOrganization, setListOrganization] = useState([]);
    const [formModal, setFormModal] = useState(false);
    const [currentData, setCurrentData] = useState({})
    const loadPage = async () => {
        const organizationList = await organizationService.listOrganization();
        setListOrganization(organizationList);
    };

    useEffect(()=>{
        loadPage()
    },[])
    const toggleModal = () => {
        setFormModal(!formModal);
    }
    const columns = [
        {
            name: 'ảnh đại diện',
            cell: row => <img src={row.avatar} style={{ width: '50px', height: '50px' }}></img>
        },
        {
            name: 'tên tổ chức',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'website',
            selector: 'website',
            sortable: true,
        },
        {
            name: 'hành động',
            cell: row => <Button className="btn btn-sm" onClick={() => {
                setCurrentData(row)
                toggleModal();
            }}><i className="fas fa-edit"></i></Button>
        },
    ];

    const handleSubmit = async () => {
        const file = currentData.avatar && currentData.avatar[0];
        const result = await toBase64(file).catch(e => Error(e));
        const name = currentData.name;
        const website = currentData.website;
        const description = currentData.description;
        if (name == undefined) {
            store.addNotification({
                title: "Lỗi",
                message: "dữ liệu không hợp lệ",
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
        if (result instanceof Error) {
            result = undefined;
        }
        const id = currentData.id ? currentData.id : 0;
        const avatar = result;

        const data = { id: id, avatar: avatar?avatar:"", name: name, website: website?website:"", description: description?description:"" }
        const resp = await organizationService.createOrUpdateOrganization(data)
        console.log('resp', resp)
        if(resp && resp.code == 0 ){
            store.addNotification({
                title: "Thành công",
                message: "Thao tác thành công",
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
            loadPage();
        }else{
            store.addNotification({
                title: "Lỗi",
                message: "Thao tác thất bại",
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

    return (
        <Container className="mt-3" fluid style={{ height: '70vh' }}>
            <Card className="shadow" style={{ height: '100%' }} >
                <Button className="btn btn-sm" style={{ position: "absolute", width: '150px', right: '50px', top: '35px', zIndex: '100' }} onClick={() => {
                    setCurrentData({});
                    toggleModal()
                }}>Thêm mới </Button>
                <CardBody style={{ height: '100%' }}>
                    <DataTable
                        title="Quản lý tổ chức"
                        pagination
                        dense
                        columns={columns}
                        overflowY={true}
                        data={listOrganization && listOrganization}
                        style={{ height: "100%", overflow: "auto" }}
                    />
                </CardBody>
            </Card>
            <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={formModal}
                toggle={toggleModal}>
                <div className="modal-body p-0">
                    <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            <Form role="form">
                                <FormGroup>
                                    <label>Tên đội</label>
                                    <Input
                                        placeholder="Tên đội"
                                        onChange={(e) => {
                                            const name = e.target.value;
                                            let curData = { ...currentData }
                                            curData.name = name;
                                            setCurrentData(curData)
                                        }}
                                        defaultValue={currentData && currentData.name}
                                        required
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>website</label>
                                    <Input
                                        placeholder="website"
                                        onChange={(e) => {
                                            const website = e.target.value;
                                            let curData = { ...currentData }
                                            curData.website = website;
                                            setCurrentData(curData)
                                        }}
                                        defaultValue={currentData && currentData.website}
                                        required
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>Mô tả</label>
                                    <Input
                                        onChange={(e) => {
                                            const desc = e.target.value;
                                            let curData = { ...currentData }
                                            curData.description = desc;
                                            setCurrentData(curData)
                                        }}
                                        placeholder="Mô tả"
                                        defaultValue={currentData && currentData.description}
                                        required
                                        type="textarea"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>Ảnh đại diện</label>
                                    <ImageUploader
                                        withPreview={true}
                                        onChange={(e) => {
                                            let curData = { ...currentData }
                                            curData.avatar = e;
                                            setCurrentData(curData)
                                        }}
                                        buttonText='Choose images'
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                        singleImage
                                    />
                                </FormGroup>
                                <div className="text-center">
                                    <Button color="warning" type="button" onClick={() => { setCurrentData({}); toggleModal(); }}>
                                        Thoát
                                    </Button>
                                    <Button color="success" type="button" onClick={handleSubmit}>
                                        Lưu
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </Modal>
        </Container>
    );
};

export default ManageUser;
