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
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import "../../assets/scss/usrun-custom/toggle.scss";
import eventService from "services/EventService";
import ImageUploader from 'react-images-upload';
import DataTable from 'react-data-table-component';
import { store } from 'react-notifications-component';
import Moment from 'react-moment';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
const formatDate = (date) => {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

const ManageEvent = () => {
    const [listEvent, setListEvent] = useState([]);
    const [formModal, setFormModal] = useState(false);
    const [currentData, setCurrentData] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const exportData = async (row) => {
        const resp = await eventService.exportData(row);
        console.log('resp', resp)
        if (resp.code == 0) {
            const data = resp.data; //array
            
            let dataCSV = 'UserId,TeamId,Email,Distance,Pace,Time\n';
            data.forEach(item=>{
                dataCSV += item.userId + ',' +item.teamId + ','+item.email + ','+item.distance + ','+item.pace + ','+item.time + '\n';
            })  
            console.log('data', dataCSV)
            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([dataCSV], {
                type: 'text/csv;charset=utf-8;'
            }));
            a.setAttribute("download", row.eventName + ".csv");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

    }

    const toggle = () => setDropdownOpen(prevState => !prevState);
    const loadPage = async () => {
        const events = await eventService.listEvent();
        console.log('event', events)
        setListEvent(events);
    };
    const getDate = (epoch) => {
        const date = Date(epoch);
        date.setMilliseconds(epoch)
        return date
    }

    useEffect(() => {
        loadPage()
    }, [])
    const toggleModal = () => {
        setFormModal(!formModal);
    }
    const columns = [
        {
            name: 'Tên sự kiện',
            selector: 'eventName',
        },
        {
            name: 'Số lượng thành viên',
            selector: 'totalParticipant',
        },
        {
            name: 'Ngày tạo',
            cell: row => <Moment unix>{row.createTime}</Moment>
        },
        {
            name: 'Hành động',
            cell: row => <><Button className="btn btn-sm" onClick={() => {
                setCurrentData(row)
                toggleModal();
            }}><i className="fas fa-edit"></i></Button>
                <Button className="btn btn-sm" onClick={() => {
                    exportData(row)
                }}><i className="fas fa-file-export"></i></Button>
                <Button className="btn btn-sm" onClick={() => {
                }}><i className="fas fa-trash-alt"></i></Button>
            </>
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

        const data = { id: id, avatar: avatar ? avatar : "", name: name, website: website ? website : "", description: description ? description : "" }
        const resp = await eventService.createOrUpdateEvent(data)
        console.log('resp', resp)
        if (resp && resp.code == 0) {
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
        } else {
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
                        title="Quản lý sự kiện"
                        pagination
                        dense
                        columns={columns}
                        overflowY={true}
                        data={listEvent && listEvent}
                        style={{ height: "100%", overflow: "auto" }}
                    />
                </CardBody>
            </Card>
            <Modal
                className="modal-dialog-centered"
                size="lg"
                isOpen={formModal}
                toggle={toggleModal}>
                <div className="modal-body p-0">
                    <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            <Form role="form">
                                <FormGroup className="row">
                                    <div className="col-6">
                                        <label>Tên sự kiện</label>
                                        <Input
                                            placeholder="Tên sự kiện"
                                            onChange={(e) => {
                                                const name = e.target.value;
                                                let curData = { ...currentData }
                                                curData.eventName = name;
                                                setCurrentData(curData)
                                            }}
                                            defaultValue={currentData && currentData.eventName}
                                            required
                                            type="text"
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label>Tiêu đề phụ</label>
                                        <Input
                                            placeholder="Mô tả"
                                            onChange={(e) => {
                                                const subtitle = e.target.value;
                                                let curData = { ...currentData }
                                                curData.subtitle = subtitle;
                                                setCurrentData(curData)
                                            }}
                                            defaultValue={currentData && currentData.subtitle}
                                            required
                                            type="text"
                                        />
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label>Thời gian sự kiện</label>
                                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                        <DropdownToggle caret>
                                            {(formatDate(new Date(currentData.startTime)) + " -> " + formatDate(new Date(currentData.endTime)))}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DateRangePicker
                                                showSelectionPreview={true}
                                                moveRangeOnFirstSelection={false}
                                                months={2}
                                                ranges={[{
                                                    startDate: new Date(currentData.startTime),
                                                    endDate: new Date(currentData.endTime),
                                                    key: 'selection'
                                                }]}
                                                direction="horizontal" />
                                        </DropdownMenu>
                                    </Dropdown>
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
                                    <label>Tổ chức bởi</label>
                                    <Input
                                        onChange={(e) => {
                                            const poweredBy = e.target.value;
                                            let curData = { ...currentData }
                                            curData.poweredBy = poweredBy;
                                            setCurrentData(curData)
                                        }}
                                        placeholder="Mô tả"
                                        defaultValue={currentData && currentData.poweredBy}
                                        required
                                        type="textarea"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>Phần thưởng</label>
                                    <Input
                                        onChange={(e) => {
                                            const reward = e.target.value;
                                            let curData = { ...currentData }
                                            curData.reward = reward;
                                            setCurrentData(curData)
                                        }}
                                        placeholder="Mô tả"
                                        defaultValue={currentData && currentData.reward}
                                        required
                                        type="textarea"
                                    />
                                </FormGroup>
                                <FormGroup className="row">
                                    <div className="col-4">
                                        <label>Thumbnail</label>
                                        <ImageUploader
                                            withPreview={true}
                                            withLabel={false}
                                            onChange={(e) => {
                                                let curData = { ...currentData }
                                                curData.avatar = e;
                                                setCurrentData(curData)
                                            }}
                                            buttonText='Choose images'
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={5242880}
                                            singleImage
                                        /></div>

                                    <div className="col-4">
                                        <label>Poster</label>
                                        <ImageUploader
                                            withPreview={true}
                                            onChange={(e) => {
                                                let curData = { ...currentData }
                                                curData.avatar = e;
                                                setCurrentData(curData)
                                            }}
                                            withLabel={false}
                                            buttonText='Choose images'
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={5242880}
                                            singleImage
                                        /></div>

                                    <div className="col-4">
                                        <label>Banner</label>
                                        <ImageUploader
                                            withPreview={true}
                                            withLabel={false}
                                            onChange={(e) => {
                                                let curData = { ...currentData }
                                                curData.avatar = e;
                                                setCurrentData(curData)
                                            }}
                                            buttonText='Choose images'
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={5242880}
                                            singleImage
                                        /></div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <label>Id tổ chức</label>
                                    <Input
                                        placeholder="Tổ chức"
                                        onChange={(e) => {
                                            const subtitle = e.target.value;
                                            let curData = { ...currentData }
                                            curData.subtitle = subtitle;
                                            setCurrentData(curData)
                                        }}
                                        defaultValue={currentData && currentData.subtitle}
                                        required
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup className="row">
                                    <label className="col-12">Id nhà tài trợ</label>
                                    <Input
                                        className='col-4'
                                        placeholder="Tài trợ vàng"
                                        onChange={(e) => {
                                            const subtitle = e.target.value;
                                            let curData = { ...currentData }
                                            curData.subtitle = subtitle;
                                            setCurrentData(curData)
                                        }}
                                        defaultValue={currentData && currentData.subtitle}
                                        required
                                        type="text"
                                    />
                                    <Input
                                        className='col-4'
                                        placeholder="Tài trợ bạc"
                                        onChange={(e) => {
                                            const subtitle = e.target.value;
                                            let curData = { ...currentData }
                                            curData.subtitle = subtitle;
                                            setCurrentData(curData)
                                        }}
                                        defaultValue={currentData && currentData.subtitle}
                                        required
                                        type="text"
                                    />
                                    <Input
                                        className='col-4'
                                        placeholder="Tài trợ đồng"
                                        onChange={(e) => {
                                            const subtitle = e.target.value;
                                            let curData = { ...currentData }
                                            curData.subtitle = subtitle;
                                            setCurrentData(curData)
                                        }}
                                        defaultValue={currentData && currentData.subtitle}
                                        required
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>Id cộng tác viên</label>
                                    <Input
                                        placeholder="Cộng tác viên"
                                        onChange={(e) => {
                                            const name = e.target.value;
                                            let curData = { ...currentData }
                                            curData.eventName = name;
                                            setCurrentData(curData)
                                        }}
                                        defaultValue={currentData && currentData.eventName}
                                        required
                                        type="text"
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

export default ManageEvent;
