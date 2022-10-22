import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../commn/metaData/MetaData'
import Sidebar from './Sidebar'
import { message, Table, Button, Row, Col, Pagination } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, deleteUser } from '../../redux/actions/user'
import { DELETE_USER_RESET } from '../../redux/actions/types';
import SkeletonTable from '../../components/skeletons/SkeletonTable';
import { TitleSearch } from "./TitleSearch";

const UsersList = ({ history }) => {

    const [container, setContainer] = useState(null)

    const dispatch = useDispatch();

    const { loading, error, users, userPerPage, usersCount } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.deleteUser)

    const [activePage, setActivePage] = useState(1)
    function setActivePageNo(page) {
        setActivePage(page)
    }
    useEffect(() => {
        dispatch(allUsers(activePage));


        if (error && typeof error !== 'object' && error !== null) {
            message.error(error);
        }
      

        if (isDeleted) {
            message.success('تم مسح المستخدم');
            history.push('/admin/users');
            dispatch({ type: DELETE_USER_RESET })
        }

    }, [dispatch, error, isDeleted, history, activePage])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }
    const dataSource = [];

    const columns = [


        {
            title: 'الاسم ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'الايميل',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'الصلاحية',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'الحدث',
            dataIndex: 'actions',
            key: 'actions',
        },
    ];

    users?.forEach(user => {
        dataSource.push({
            key: user._id,
            name: user.name,
            email: user.email,
            role: user.role,

            actions: <div className="action">
                <Button>
                    <Link to={`/admin/user/${user._id}`}>
                        <EditOutlined />
                    </Link>
                </Button>
                <Button onClick={() => deleteUserHandler(user._id)}>
                    <DeleteOutlined />
                </Button>
            </div>
        })
    })

    const [filterInput, setFilterInput] = useState('')


    const filterData = () => {
        if (filterInput === '') return dataSource

        if (isNaN(filterInput)) {
            return dataSource.filter(({ name }) => name.includes(filterInput))
        }
    }


    return (
        <Fragment>
            <MetaData title={'المستخدمين'} />
            <div className="container" ref={setContainer}>
                <Row>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Sidebar
                            container={container}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <div className="allOrder">
                            <div className="search-title">
                                <h4>المستخدمين</h4>
                                <TitleSearch onSearch={setFilterInput} />
                            </div>

                            {loading ? <SkeletonTable /> : (

                                <Table dataSource={filterData()} columns={columns} scroll={{ x: '100%' }} pagination={false} />
                            )}

                        </div>

                        {userPerPage <= usersCount && (

                            <div className="container">
                                <div className="pagination">
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Pagination
                                                onChange={setActivePageNo}
                                                defaultCurrent={activePage}
                                                total={usersCount}
                                                pageSize={userPerPage}

                                            />
                                        </Col>
                                    </Row>

                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </div>

        </Fragment>
    )
}

export default UsersList
