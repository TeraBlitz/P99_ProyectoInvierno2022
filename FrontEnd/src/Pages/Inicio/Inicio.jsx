import React from "react";
import logo from '../Inicio/p99Logo.png';
import '../Inicio/inicio.css';
import { Row, Col, Typography, Button } from 'antd';
import OneToOneIcon from '../../assets/HomePageAssets/OneToOneIcon.svg';
import ArtIcon from '../../assets/HomePageAssets/ArtIcon.svg';
import LanguageIcon from '../../assets/HomePageAssets/LanguageIcon.svg';
import FacebookIcon from '../../assets/HomePageAssets/FacebookIcon.svg';

const { Title } = Typography;
const Inicio = ({changeContent}) => {
    return (
        <div className="inicio-container">
            <Row gutter={[12, 12]} justify="space-evenly">
                <Col align="center" justify="center" span={14}>
                    <Row gutter={12} align="center">
                        <p style={{ margin: '1rem', fontWeight: 'bold', display: 'inline-block' }}>¿Quiénes somos?</p>
                    </Row>
                    <Row style={{ fontWeight: '500', color: '#406EB5', display: 'inline-block' }}>"La unión hace la fuerza"</Row>
                    <Row style={{ margin: '1rem', display: 'inline-block'}}>
                        Somos un grupo de jóvenes buscando combatir, prevenir y disminuir la deserción escolar en comunidades urbano marginadas, ofreciendo actividades extracurriculares que fomenten el talento y el desarrollo integral de las personas.
                    </Row>
                    <Row gutter={12} justify="space-evenly">
                        <Col span={24} sm={12}>
                            <Button className="buttonOnCollapse" onClick={() => window.open("https://www.facebook.com/proyecto99mty/", "_blank")} style={{marginTop: '1rem', backgroundColor: '#406EB5', color: 'white', fontWeight: 'bold', width: '80%', height: '2.5rem' }}>CONTÁCTANOS</Button>
                        </Col>
                        <Col span={24} sm = {12}>
                            <Button className="buttonOnCollapse" onClick={() => {changeContent('Profile')}} style={{ marginTop: '1rem', backgroundColor: 'white', width: '100%', height: '2.5rem', fontWeight: 'bold', color: 'gray'}}>CREAR ALUMNO</Button>
                        </Col>
                    </Row>
                </Col>
                <Col className="logocol" align="center" justify="center" span={10}>
                    <img className="logo" src={logo} alt="logo" />
                </Col>
            </Row>
            <Row style={{ background: '#f0f0f0', marginTop: '.5rem'}} justify="center">
                <Col span={24} align="center">
                    <Title style={{ fontWeight: 'bold', marginTop: '.5rem' }} level={3}>¿Qué ofrecemos?</Title>
                </Col>
                <Row style={{ background: '#f0f0f0', margin: '1rem'}} justify='space-between'>
                    <Col span={24} sm={8} align="center">
                        <h1 style={{ color: '#406EB5', fontWeight: 'bold'}}>GRATUIDAD</h1>
                        <h4>
                            Sin cuotas de inscripción, materiales accesibles.
                        </h4>
                    </Col>
                    <Col span={24} sm={8} align="center">
                        <h1 style={{ color: '#406EB5', fontWeight: 'bold', whiteSpace: 'nowrap' }}>CLASES PERSONALIZADAS</h1>
                        <h4>
                            Cursos adaptables a los alumnos y su ritmo de aprendizaje.
                        </h4>
                    </Col>
                    <Col span={24} sm={8} align="center">
                        <h1 style={{ color: '#406EB5', fontWeight: 'bold'}}>VARIEDAD</h1>
                        <h4>
                            Contenido según los intereses y necesidades de los alumnos.
                        </h4>
                    </Col>
                </Row>
            </Row>
            <Row style={{marginTop: '1rem'}} justify="center">
                <Row justify="space-between">
                    <Col span={24} sm={8} align="center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h4>
                            Asesorías 1 a 1 para reforzar conocimientos académicos
                        </h4>
                        <img src={OneToOneIcon} alt="OneToOneIcon" style={{ width: '75px', height: '75px', marginTop: 'auto' }} />
                    </Col>
                    <Col span={24} sm={8} align="center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h4>
                            Talleres artísticos, culturales y deportivos.
                        </h4>
                        <img src={ArtIcon} alt="ArtIcon" style={{ width: '75px', height: '75px', marginTop: 'auto' }} />
                    </Col>
                    <Col span={24} sm={8} align="center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h4>
                            Cursos de Idiomas con variedad de lenguas extranjeras disponibles.
                        </h4>
                        <img src={LanguageIcon} alt="LanguageIcon" style={{ width: '75px', height: '75px', marginTop: 'auto' }} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2rem' }}>
                    <h2 style={{ margin: '.5rem' }}>
                        {`Si tienes dudas sobre cómo usar la página para inscribirte, puedes ver el tutorial en este `}
                        <a href="https://drive.google.com/file/d/1MfF_1iroHMV5S8gSC3xGOqm48mIEglcw/view?usp=sharing" target="_blank" rel="noopener noreferrer">enlace</a>.
                    </h2>
                    <h2 style={{ margin: '.5rem' }}>
                        <img className = "facebookIcon" src={FacebookIcon} alt="FacebookIcon" style={{ width: '15px', height: '15px' }} />
                    </h2>
                </Row>
            </Row>
        </div>
    );
};

export default Inicio;
