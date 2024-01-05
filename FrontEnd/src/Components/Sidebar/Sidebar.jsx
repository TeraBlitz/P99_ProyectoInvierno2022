import React, { useContext } from 'react'
// import SignOutButton from '../SignOut/SignOutButton'
// import ContactUsButton from '../Contact/ContactUsButton'
import {userContext} from './../../App.jsx'
import { useAuth0 } from "@auth0/auth0-react";
import { Menu, Layout } from 'antd';
import { useState } from 'react';
import {
    HomeOutlined,
    UserOutlined,
    BookOutlined,
    SolutionOutlined,
    UnorderedListOutlined,
    ControlOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

function Sidebar(props) {
    // agregar un componente a la sidebar :
    // key: identificador unico (Math.random())
    // title: como va a aparecer en el boton de la sidebar
    // content: nombre del componente renderizado en PagesToRender (app.jsx)
    const [collapsed, setCollapsed] = useState(false);
    const { user, logout } = useAuth0();
    const role = user?.p99roles ? user?.p99roles[0] == "admin" ? "admin" :  "estudiante" : ""
    const userValues = useContext(userContext)
    const options = [
        {
            key: 0,
            title: 'Inicio',
            content: 'Inicio',
            rol: 'any',
            icon: <HomeOutlined />,
        },
        {
            key: 1,
            title: 'Perfil',
            content: 'Profile',
            rol: 'any',
            icon: <UserOutlined />,
        },
        {
            key: 2,
            title: 'Registro Clases',
            content: 'RegistroClasesAlumnos',
            rol: 'estudiante',
            icon: <BookOutlined />,
        },
        {
            key: 4,
            title: 'Mis Clases (Profesor)',
            content: 'MisClasesProfesor',
            rol: 'profesor',
            icon: <SolutionOutlined />,
        },
        {
            key: 5,
            title: 'Mis Clases',
            content: 'MisClases',
            rol: 'estudiante',
            icon: <UnorderedListOutlined />,
        },
        {
            key: 6,
            title: 'Panel de control',
            content: 'ControlPanel',
            rol: 'admin',
            icon: <ControlOutlined />,
        },
        {
            //Tres casos de uso para cada funcionalidad del sidebar con respecto al logout.
            key: 7,
            title: (
                <>
                    <LogoutOutlined
                        onClick={() => {
                            logout({
                                logoutParams: {
                                    returnTo: window.location.origin
                                }
                            });
                        }}
                    />
                    {!collapsed && <span style={{ marginLeft: '8px' }} onClick={() => {
                            logout({
                                logoutParams: {
                                    returnTo: window.location.origin
                                }
                            });
                        }}>Cerrar Sesión</span>}
                    {collapsed && <span onClick={() => {
                            logout({
                                logoutParams: {
                                    returnTo: window.location.origin
                                }
                            });
                        }}>Cerrar Sesión</span> }

                </>
            ),
            content: '',
            rol: 'any',
        },
    ]

    //Funcion para colapsar el sider de Ant Design
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    
    //Se cambio la lista de MUI por un Menu de Ant Design, mismo concepto con el arreglo de opciones.
    const listItems = (
        <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed} width={240}>
            <Menu theme="dark" mode="vertical" style={{ height: '100vh', backgroundColor: '#406EB5' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                    <img src="/logo_p99.png" style={{ width: '80px' }} alt="Logo"></img>
                </div>
                {options.map(e => {
                    if (role === e.rol || e.rol === 'any') {
                        return (
                            <Menu.Item key={e.key} onClick={() => props.changeContent(e.content)} icon={e.icon} selected={props.currentPage === e.key}>
                                {e.title}
                            </Menu.Item>
                        )
                    }
                })}
            </Menu>
        </Sider>
    )

    return (
        <Layout>
            {listItems}
        </Layout>
    )
}

export default Sidebar
