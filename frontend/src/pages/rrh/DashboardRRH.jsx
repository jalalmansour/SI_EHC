import React, { useState } from 'react';
import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
} from "antd";
import {
  ToTopOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from "@ant-design/icons";

import EChart from "../../components/dashboard/chart/EChart";
import LineChart from "../../components/dashboard/chart/LineChart";


// Importation des images (à adapter selon votre structure de dossiers)
import ava1 from "../../assets/images/logo-shopify.svg";
import ava2 from "../../assets/images/logo-atlassian.svg";
import ava3 from "../../assets/images/logo-slack.svg";
import ava4 from "../../assets/images/logo-spotify.svg";
import ava5 from "../../assets/images/logo-jira.svg";
import ava6 from "../../assets/images/logo-invision.svg";
import team1 from "../../assets/images/team-1.jpg";
import team2 from "../../assets/images/team-2.jpg";
import team3 from "../../assets/images/team-3.jpg";
import team4 from "../../assets/images/team-4.jpg";
import cardImage from "../../assets/images/info-card-1.jpg";

const { Title, Text, Paragraph } = Typography;

const DashboardRRH = () => {
  const [reverse, setReverse] = useState(false);

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  // Icônes SVG sous forme de composants React
  const DollarIcon = () => (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#fff"/>
      <path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#fff"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#fff"/>
    </svg>
  );

  const ProfileIcon = () => (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z" fill="#fff"/>
      <path d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z" fill="#fff"/>
      <path d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z" fill="#fff"/>
      <path d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z" fill="#fff"/>
    </svg>
  );

  const HeartIcon = () => (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z" fill="#fff"/>
    </svg>
  );

  const CartIcon = () => (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#fff"/>
    </svg>
  );

  const count = [
    {
      today: "Today's Sales",
      title: "$53,000",
      persent: "+30%",
      icon: <DollarIcon />,
      bnb: "bnb2",
    },
    {
      today: "Today's Users",
      title: "3,200",
      persent: "+20%",
      icon: <ProfileIcon />,
      bnb: "bnb2",
    },
    {
      today: "New Clients",
      title: "+1,200",
      persent: "-20%",
      icon: <HeartIcon />,
      bnb: "redtext",
    },
    {
      today: "New Orders",
      title: "$13,200",
      persent: "10%",
      icon: <CartIcon />,
      bnb: "bnb2",
    },
  ];

  const list = [
    {
      img: ava1,
      Title: "Soft UI Shopify Version",
      bud: "$14,000",
      progress: <Progress percent={60} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            <img className="tootip-img" src={team4} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava2,
      Title: "Progress Track",
      bud: "$3,000",
      progress: <Progress percent={10} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava3,
      Title: "Fix Platform Errors",
      bud: "Not Set",
      progress: <Progress percent={100} size="small" status="active" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava4,
      Title: "Launch new Mobile App",
      bud: "$20,600",
      progress: <Progress percent={100} size="small" status="active" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava5,
      Title: "Add the New Landing Page",
      bud: "$4,000",
      progress: <Progress percent={80} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={team3} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            <img className="tootip-img" src={team4} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava6,
      Title: "Redesign Online Store",
      bud: "$2,000",
      progress: (
        <Progress
          percent={100}
          size="small"
          status="exception"
          format={() => "Cancel"}
        />
      ),
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={team1} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={team2} alt="" />
          </Tooltip>
        </div>
      ),
    },
  ];

  const timelineList = [
    {
      title: "$2,400 - Redesign store",
      time: "09 JUN 7:20 PM",
      color: "green",
    },
    {
      title: "New order #3654323",
      time: "08 JUN 12:20 PM",
      color: "green",
    },
    {
      title: "Company server payments",
      time: "04 JUN 3:10 PM",
    },
    {
      title: "New card added for order #4826321",
      time: "02 JUN 2:45 PM",
    },
    {
      title: "Unlock folders for development",
      time: "18 MAY 1:30 PM",
    },
    {
      title: "New order #46282344",
      time: "14 MAY 3:30 PM",
      color: "gray",
    },
  ];

  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="layout-content p-6 bg-gray-50 min-h-screen">
      <Row gutter={[24, 24]} className="mb-6">
        {count.map((c, index) => (
          <Col
            key={index}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            className="mb-6"
          >
            <Card 
              bordered={false} 
              className="rounded-xl shadow-md overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            >
              <div className="p-4">
                <Row align="middle" gutter={[16, 0]}>
                  <Col span={18}>
                    <span className="text-sm opacity-80">{c.today}</span>
                    <Title level={3} className="mt-1 mb-0 text-white">
                      {c.title} <small className={`text-sm ${c.bnb === 'redtext' ? 'text-red-300' : 'text-green-300'}`}>{c.persent}</small>
                    </Title>
                  </Col>
                  <Col span={6} className="flex justify-end">
                    <div className="bg-white bg-opacity-20 p-3 rounded-full">
                      {c.icon}
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} lg={12} className="mb-6">
          <Card bordered={false} className="rounded-xl shadow-md h-full">
            <EChart />
          </Card>
        </Col>
        <Col xs={24} lg={12} className="mb-6">
          <Card bordered={false} className="rounded-xl shadow-md h-full">
            <LineChart />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} xl={16} className="mb-6">
          <Card bordered={false} className="rounded-xl shadow-md h-full">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <Title level={5} className="mb-1">Projects</Title>
                  <Paragraph className="text-gray-500 mb-0">
                    done this month<span className="text-blue-500 ml-1">40%</span>
                  </Paragraph>
                </div>
                <div>
                  <Radio.Group onChange={onChange} defaultValue="a" buttonStyle="solid">
                    <Radio.Button value="a">ALL</Radio.Button>
                    <Radio.Button value="b">ONLINE</Radio.Button>
                    <Radio.Button value="c">STORES</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">COMPANIES</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">MEMBERS</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">BUDGET</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">COMPLETION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((d, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <img src={d.img} alt="" className="w-8 h-8 mr-3" />
                            <span className="font-medium">{d.Title}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{d.member}</td>
                        <td className="py-3 px-4">
                          <span className="font-semibold">{d.bud}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="w-24">{d.progress}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4">
                <Upload {...uploadProps}>
                  <Button
                    type="dashed"
                    className="w-full h-12 rounded-lg border-dashed border-2 border-gray-300 hover:border-blue-400"
                    icon={<ToTopOutlined />}
                  >
                    <span className="text-gray-600">Click to Upload</span>
                  </Button>
                </Upload>
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} xl={8} className="mb-6">
          <Card bordered={false} className="rounded-xl shadow-md h-full">
            <div className="p-4">
              <Title level={5}>Orders History</Title>
              <Paragraph className="text-gray-500 mb-6">
                this month <span className="text-green-500">20%</span>
              </Paragraph>

              <Timeline
                pending="Recording..."
                reverse={reverse}
                className="mb-6"
              >
                {timelineList.map((t, index) => (
                  <Timeline.Item color={t.color || "blue"} key={index}>
                    <Text strong className="block">{t.title}</Text>
                    <Text type="secondary" className="text-xs">{t.time}</Text>
                  </Timeline.Item>
                ))}
              </Timeline>
              
              <Button
                type="primary"
                className="w-full h-10 rounded-lg"
                icon={<MenuUnfoldOutlined />}
                onClick={() => setReverse(!reverse)}
              >
                REVERSE
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14} className="mb-6">
          <Card bordered={false} className="rounded-xl shadow-md h-full">
            <Row className="h-full">
              <Col xs={24} md={14} className="p-6 flex flex-col justify-between">
                <div>
                  <Text className="text-gray-500">Built by developers</Text>
                  <Title level={5} className="mt-2">Muse Dashboard for Ant Design</Title>
                  <Paragraph className="text-gray-600 mb-8">
                    From colors, cards, typography to complex elements, you will find the full documentation.
                  </Paragraph>
                </div>
                <div className="flex items-center text-blue-500 font-medium cursor-pointer hover:text-blue-600">
                  <span>Read More</span>
                  <RightOutlined className="ml-1" />
                </div>
              </Col>
              <Col xs={24} md={10} className="flex items-center justify-center p-4">
                <img src={cardImage} alt="" className="rounded-lg max-h-48 object-cover w-full" />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={10} className="mb-6">
          <Card 
            bordered={false} 
            className="rounded-xl shadow-md h-full bg-gradient-to-br from-purple-700 to-blue-800 text-white"
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <Title level={5} className="text-white">Work with the best</Title>
                <p className="text-white text-opacity-80 mt-2">
                  Wealth creation is an evolutionarily recent positive-sum game. 
                  It is all about who take the opportunity first.
                </p>
              </div>
              <div className="flex items-center text-white font-medium cursor-pointer mt-4 opacity-90 hover:opacity-100">
                <span>Read More</span>
                <RightOutlined className="ml-1" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardRRH;