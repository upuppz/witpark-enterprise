import { Avatar, Card, Col, List, Skeleton, Row, Statistic, Button, Space, Empty } from 'antd';
import React, { Component } from 'react';

import {  connect, useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import { Chart, Line } from 'bizcharts';
import { ConnectProps } from '@@/plugin-dva/connect';
import { ModalState } from './model';
import styles from './style.less';

interface WelcomeProps extends ConnectProps, ModalState {
  analysisLoading: boolean;
}

const PageHeaderContent: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.currentUser) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }

  const { currentUser } = initialState;

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          您好，
          {currentUser?.nickname}
        </div>
        <div>{currentUser?.description}</div>
      </div>
    </div>
  );
};

const ExtraContent: React.FC<{ amount: number }> = ({ amount }) => (
  <div className={styles.extraContent}>
    <div>
      <Statistic title="账户余额" valueStyle={{ color: '#ff4d4f' }} value={amount} prefix="￥" />
    </div>
    <div className={styles.btn}>
      <Space>
        <Button danger type="primary">
          充值
        </Button>
        <Button danger>钱包</Button>
      </Space>
    </div>
  </div>
);

class Welcome extends Component<WelcomeProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch?.({
      type: 'welcome/init',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch?.({
      type: 'welcome/clear',
    });
  }

  renderActivities = (item: any) => {
    const events = item.template.split(/@{([^{}]*)}/gi).map((key: React.Key) => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }
      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          // avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  render() {
    const { analysisLoading, amount, consumptionTrend } = this.props;

    return (
      <PageContainer
        content={<PageHeaderContent />}
        extraContent={<ExtraContent amount={amount} />}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              title="食堂菜谱"
              bordered={false}
              // extra={<Link to="/">历史菜谱</Link>}
              loading={false}
              bodyStyle={{ padding: 0 }}
            >
              <Empty
                description="功能开发中..."
                style={{height:286,transform: 'translateY(25%)'}}
                image={
                  <svg
                    className="icon"
                    viewBox="0 0 1476 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="5993"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M992.874611 780.862007c-17.556759 0-34.651012-2.04983-50.804217-6.091524l-0.536508-0.131968-5.330546-0.891713-19.034314-57.126378c-5.661084-16.978318-23.126575-29.297033-41.530647-29.297033-2.143565 0-4.27973 0.173903-6.348061 0.518008l-60.104921 9.702776-3.121613-3.126546c-8.257289-10.319453-16.034804-20.120897-21.785922-31.635467l-0.386039-0.770845-0.477307-0.715344c-7.356942-11.037263-13.480533-24.689232-17.709695-39.48205l-0.193636-0.67711-1.540457-3.851757 38.237599-45.909045c12.604853-15.778267 12.60362-40.495865-0.001233-56.271665l-38.235132-45.906579 1.345586-3.365816c11.924043-31.008925 24.491895-53.779061 40.698135-73.716189l3.137647-3.13888 57.968756 9.671943c2.073264 0.342872 4.200795 0.516774 6.339427 0.516774 18.341171 0 35.740062-12.213881 41.46528-29.077496l21.105112-57.583951 3.137646-0.627776a278.128177 278.128177 0 0 1 50.462579-4.628769c16.91665 0 33.925801 1.56389 50.556314 4.647269l5.127042 0.857179 18.965247 55.024747c6.764933 20.173931 28.522488 31.060726 45.579741 31.060726h0.890479l61.297573-7.925518 3.318949 3.32265c8.262222 10.342886 16.045904 20.162831 21.778522 31.634234l0.383572 0.768378 0.476074 0.712877c8.418858 12.64432 14.049108 24.502995 17.710928 37.323685l1.466455 5.135676-37.956394 47.459368c-12.608553 15.7832-12.608553 40.498332-0.0037 56.274132l36.087867 43.708745-1.500989 3.758023-0.165269 0.540208c-7.476577 24.290859-20.873242 48.944323-38.743273 71.29142l-3.60632 4.506667-56.987009-9.507908a38.838241 38.838241 0 0 0-6.349294-0.518007c-18.402839 0-35.867097 12.318715-41.526947 29.292099l-19.136682 57.416215-3.293049 0.659844-0.320671 0.078934c-16.155672 4.042926-33.251158 6.092757-50.806685 6.092757z m-41.037306-19.750892l8.010618 1.602124c11.671206 2.332268 23.515081 3.515052 35.203554 3.515051 11.689706 0 23.533581-1.182784 35.204787-3.515051l7.731881-1.546623 17.826863-50.989221c7.486444-22.455632 31.232162-39.390782 55.23565-39.390782 3.106813 0 6.169225 0.298471 9.105834 0.88678l0.43784 0.081401 47.810873 7.976085 4.955607-7.443277c7.037504-10.567356 17.091786-27.052333 25.032103-45.56864l3.388017-7.905783-31.529399-36.798278c-16.94255-20.418135-17.749162-54.340236-1.824127-75.801787l34.415442-42.375492-5.661084-8.473126c-3.897391-5.83622-8.080919-14.22301-12.123846-22.332296l-0.386039-0.775779-18.115468-27.179368-49.739835 5.245444a57.807188 57.807188 0 0 1-7.153439 0.444007c-25.798015 0-50.262776-17.224988-58.173493-40.955905l-15.527896-46.607122-7.839182-1.586091c-11.573771-2.340901-23.42628-3.527385-35.231921-3.527385s-23.659383 1.186484-35.229454 3.527385l-7.560445 1.529356-17.910731 48.618719-0.069068 0.20597c-7.476577 22.454399-31.211195 39.387082-55.208516 39.387082-3.109279 0-6.176625-0.298471-9.116935-0.888013l-0.222003-0.045634-47.030162-7.835483-5.071541 6.08659c-12.142346 14.573282-19.145316 30.938624-25.918883 46.763758l-3.402817 7.948951 33.722298 38.929508c17.258288 20.826374 17.162087 54.859477-0.181303 77.714715l-33.914701 39.161379 4.115694 8.248655c1.228418 2.46177 2.306367 5.049341 3.448451 7.789849 2.527137 6.070556 5.386046 12.937858 10.59819 19.986462 1.258019 1.927728 2.350768 3.972625 3.506419 6.130991 2.247167 4.205729 4.796504 8.970166 8.871497 13.048859l4.929707 4.928473 50.029672-7.513578a57.893522 57.893522 0 0 1 7.005437-0.424273c25.770881 0 50.204809 17.175654 58.142659 40.852304l15.413195 48.869089z m-639.173346 13.254829c-52.98725-0.0074-94.495697-41.550381-94.495697-94.575864V94.548731c0-53.018084 41.510913-94.549964 94.503097-94.549964h736.542752c52.992183 0 94.503097 41.534347 94.503096 94.557364v186.414921c0 5.360146-2.496304 7.856449-7.857683 7.85645-5.346579 0-7.836716-2.49877-7.836715-7.86385V217.301745H233.862661v462.496968c0 44.21072 34.614012 78.843232 78.801298 78.843232h519.916883c5.352746 0 7.845349 2.497537 7.84535 7.857683 0 5.365079-2.492604 7.865083-7.84535 7.865083H312.663959z m0-758.651812c-44.187286 0-78.801298 34.631278-78.801298 78.843232v107.024082h894.158914V94.557364c0-44.211953-34.616478-78.843232-78.807464-78.843232H312.663959z m680.229153 624.259659c-52.992183 0-94.503097-41.536814-94.503097-94.558597 0-53.029184 41.510913-94.567231 94.503097-94.567231 52.988483 0 94.494463 41.539281 94.494463 94.567231 0 24.616464-10.007415 48.184579-28.179617 66.367881-18.168502 18.177135-41.721817 28.18825-66.318546 28.190716h0.0037z m-0.0074-173.404296c-44.187286 0-78.801298 34.632512-78.801298 78.845699 0 44.208253 34.612778 78.835832 78.801298 78.835832 44.194686 0 78.807465-34.627578 78.807464-78.835832 0-44.213187-34.616478-78.845699-78.807464-78.845699zM399.351307 610.512723c-2.872476 0-5.804152-1.907995-7.65788-4.981507l-67.247261-114.176288 67.21766-110.067993c1.394921-2.324868 3.306616-3.455851 5.84362-3.455851 1.779726 0 3.691421 0.583375 5.529115 1.687225l0.952147 0.572275 1.031082 0.411939c0.522941 0.208436 1.313519 0.525408 1.789593 2.333501 0.513074 1.952396 0.329305 4.490633-0.48224 6.948703l-62.111585 101.27543 62.751694 106.980915c1.105083 1.840161 1.36902 3.765422 0.783179 5.716584-0.66971 2.236066-2.343368 4.246429-4.711403 5.670951-1.200051 0.720277-2.439569 1.084116-3.687721 1.084116z m235.925353-3.129013c-1.398621 0-2.856442-0.226937-4.278497-0.66231-1.095216-1.726692-1.761226-6.677365-0.646276-9.334005l62.366888-106.318604-62.777594-102.370647c-2.628272-4.432666-0.297238-9.289604 2.414902-11.692172a7.735581 7.735581 0 0 1 3.494085-0.815246c2.804641 0 5.842386 1.472622 7.719548 3.707455l66.747753 109.287282-67.241094 114.183687c-1.618157 2.662806-4.241496 4.014559-7.799715 4.01456z m-171.127529-10.839927c-1.81426 0-3.729655-0.383572-5.537749-1.105083-0.797978-0.318205-1.419588-1.867294-1.711892-3.098179-0.622843-2.620872-0.439073-5.812786 0.467441-8.52246l107.782592-187.643339c1.621857-2.50617 4.189695-3.777756 7.636913-3.777756 1.440555 0 2.942777 0.240504 4.404299 0.701777 4.012093 3.104346 3.516285 8.630994 2.376668 12.028878l-107.671591 187.45587c-1.615691 2.628272-4.220529 3.960292-7.746681 3.960292zM1027.54659 119.762137c-5.351512 0-7.844116-2.501237-7.844115-7.868783 0-5.357679 2.492604-7.852749 7.844115-7.85275 5.355212 0 7.849049 2.49877 7.84905 7.865083 0.001233 5.360146-2.493837 7.856449-7.84905 7.85645z m-64.990227 0c-5.352746 0-7.845349-2.501237-7.845349-7.868783 0-5.357679 2.492604-7.852749 7.845349-7.85275 5.351512 0 7.844116 2.49877 7.844116 7.865083 0 5.360146-2.492604 7.856449-7.844116 7.85645z m-64.99146 0c-5.346579 0-7.836716-2.501237-7.836716-7.868783 0-5.357679 2.492604-7.852749 7.845349-7.85275 5.355212 0 7.849049 2.49877 7.84905 7.865083 0 5.360146-2.493837 7.857683-7.84905 7.857683h-0.008633z"
                      fill="#848484"
                      p-id="5994"
                     />
                    <path
                      d="M104.55685 889.387077c-2.400102 0-4.145295-0.578442-5.334246-1.766159-1.355453-1.356687-1.768626-2.413669-1.768626-4.531334 0-3.717322 3.38555-7.104105 7.102872-7.104105h4.933406v-0.790578h54.419171c3.717322 0 7.102872 3.379383 7.102872 7.089305 0 3.717322-3.38555 7.101638-7.102872 7.101638h-59.352577zM795.519861 980.356622c-3.473118 0-6.298726-3.184514-6.298726-7.101639 0-3.909724 2.825608-7.091771 6.298726-7.091771h415.461874c3.466951 0 6.287626 3.182047 6.287626 7.091771 0 3.917125-2.820675 7.101638-6.287626 7.101639H795.519861zM1327.27692 981.160767c-3.473118 0-6.298726-3.18698-6.298726-7.104105 0-3.909724 2.825608-7.089305 6.298726-7.089305h90.627906c3.473118 0 6.298726 3.17958 6.298726 7.089305 0 3.917125-2.825608 7.104105-6.298726 7.104105h-90.627906zM356.396138 932.586449c-3.709921 0-7.088071-3.376917-7.088071-7.089305 0-3.717322 3.37815-7.101638 7.088071-7.101638h727.459118c3.717322 0 7.102872 3.384317 7.102872 7.101638 0 3.712388-3.38555 7.089305-7.102872 7.089305H356.396138zM601.824465 1023.998767c-3.701288 0-6.287626-2.592505-6.287626-6.298727 0-3.709921 2.586338-6.298726 6.287626-6.298726h91.444385c3.701288 0 6.286393 2.590038 6.286393 6.298726 0 3.707455-2.585105 6.298726-6.286393 6.298727h-91.444385zM241.69691 889.387077c-3.711155 0-7.090538-3.384317-7.090538-7.101638 0-2.117665 0.413173-3.174647 1.769859-4.5338 0.579675-0.578442 2.527137-1.830294 5.82882-2.555505H426.409806c4.262463 2.681306 7.171939 6.055756 7.656647 7.324875-0.138135 3.623587-3.453384 6.864835-7.086838 6.864835H241.69691zM1018.090484 889.387077c-3.717322 0-7.102872-3.384317-7.102872-7.101638 0-1.801927 1.027382-3.788856 1.768627-4.531334 0.742478-0.742478 2.72694-1.768626 4.531333-1.768626h145.975791c2.834242 0 6.417128 3.416384 7.079438 6.651465-0.204736 3.57672-3.486685 6.750133-7.079438 6.750133H1018.090484zM22.082631 988.231571c-3.708688 0-6.298726-2.592505-6.298726-6.298726 0-3.709921 2.590038-6.298726 6.298726-6.298726h566.246502c3.708688 0 6.29996 2.590038 6.299959 6.298726 0 3.707455-2.591272 6.298726-6.299959 6.298726h-566.246502z"
                      fill="#848484"
                      p-id="5995"
                     />
                  </svg>
                }
              />
              {/* {[{
                'id': 'xxx1',
                'title': 'Alipay',
                'logo': 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                'description': '那是一种内在的东西，他们到达不了，也无法触及的',
                'updatedAt': '2020-10-28T02:59:21.516Z',
                'member': '科学搬砖组',
                'href': '',
                'memberLink': '',
              }, {
                'id': 'xxx2',
                'title': 'Angular',
                'logo': 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
                'description': '希望是一个好东西，也许是最好的，好东西是不会消亡的',
                'updatedAt': '2017-07-24T00:00:00.000Z',
                'member': '全组都是吴彦祖',
                'href': '',
                'memberLink': '',
              }, {
                'id': 'xxx3',
                'title': 'Ant Design',
                'logo': 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
                'description': '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
                'updatedAt': '2020-10-28T02:59:21.516Z',
                'member': '中二少女团',
                'href': '',
                'memberLink': '',
              }, {
                'id': 'xxx4',
                'title': 'Ant Design Pro',
                'logo': 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
                'description': '那时候我只会想自己想要什么，从不想自己拥有什么',
                'updatedAt': '2017-07-23T00:00:00.000Z',
                'member': '程序员日常',
                'href': '',
                'memberLink': '',
              }, {
                'id': 'xxx5',
                'title': 'Bootstrap',
                'logo': 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
                'description': '凛冬将至',
                'updatedAt': '2017-07-23T00:00:00.000Z',
                'member': '高逼格设计天团',
                'href': '',
                'memberLink': '',
              }, {
                'id': 'xxx6',
                'title': 'React',
                'logo': 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
                'description': '生命就像一盒巧克力，结果往往出人意料',
                'updatedAt': '2017-07-23T00:00:00.000Z',
                'member': '骗你来学计算机',
                'href': '',
                'memberLink': '',
              }].map((item) => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to={item.href}>{item.title}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{item.member || ''}</Link>
                      {item.updatedAt && (
                        <span className={styles.datetime} title={item.updatedAt}>
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))} */}
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="公告"
              loading={false}
            >
             {/* <List<any>
                loading={false}
                renderItem={(item) => this.renderActivities(item)}
                dataSource={[
                  {
                    id: 'trend-1',
                    updatedAt: '2020-10-28T02:59:21.516Z',
                    user: {
                      name: '曲丽丽',
                      avatar:
                        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                    },
                    group: { name: '高逼格设计天团', link: 'http://github.com/' },
                    project: { name: '六月迭代', link: 'http://github.com/' },
                    template: '【公告】节省计划正式发布',
                  },
                  {
                    id: 'trend-2',
                    updatedAt: '2020-10-28T02:59:21.516Z',
                    user: {
                      name: '付小小',
                      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
                    },
                    group: { name: '高逼格设计天团', link: 'http://github.com/' },
                    project: { name: '六月迭代', link: 'http://github.com/' },
                    template: '在 @{group} 新建项目 @{project}',
                  },
                  {
                    id: 'trend-3',
                    updatedAt: '2020-10-28T02:59:21.516Z',
                    user: {
                      name: '林东东',
                      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
                    },
                    group: { name: '中二少女团', link: 'http://github.com/' },
                    project: { name: '六月迭代', link: 'http://github.com/' },
                    template: '在 @{group} 新建项目 @{project}',
                  },
                  {
                    id: 'trend-4',
                    updatedAt: '2020-10-28T02:59:21.516Z',
                    user: {
                      name: '周星星',
                      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
                    },
                    project: { name: '5 月日常迭代', link: 'http://github.com/' },
                    template: '将 @{project} 更新至已发布状态',
                  },
                  {
                    id: 'trend-5',
                    updatedAt: '2020-10-28T02:59:21.516Z',
                    user: {
                      name: '朱偏右',
                      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
                    },
                    project: { name: '工程效能', link: 'http://github.com/' },
                    comment: { name: '留言', link: 'http://github.com/' },
                    template: '在 @{project} 发布了 @{comment}',
                  },
                  {
                    id: 'trend-6',
                    updatedAt: '2020-10-28T02:59:21.516Z',
                    user: {
                      name: '乐哥',
                      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
                    },
                    group: { name: '程序员日常', link: 'http://github.com/' },
                    project: { name: '品牌迭代', link: 'http://github.com/' },
                    template: '在 @{group} 新建项目 @{project}',
                  },
                ]}
                className={styles.activitiesList}
                size="large"
              /> */}
              <Empty
                description="功能开发中..."
                style={{height:286,transform: 'translateY(25%)'}}
                image={
                  <svg
                    className="icon"
                    viewBox="0 0 1476 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="5993"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M992.874611 780.862007c-17.556759 0-34.651012-2.04983-50.804217-6.091524l-0.536508-0.131968-5.330546-0.891713-19.034314-57.126378c-5.661084-16.978318-23.126575-29.297033-41.530647-29.297033-2.143565 0-4.27973 0.173903-6.348061 0.518008l-60.104921 9.702776-3.121613-3.126546c-8.257289-10.319453-16.034804-20.120897-21.785922-31.635467l-0.386039-0.770845-0.477307-0.715344c-7.356942-11.037263-13.480533-24.689232-17.709695-39.48205l-0.193636-0.67711-1.540457-3.851757 38.237599-45.909045c12.604853-15.778267 12.60362-40.495865-0.001233-56.271665l-38.235132-45.906579 1.345586-3.365816c11.924043-31.008925 24.491895-53.779061 40.698135-73.716189l3.137647-3.13888 57.968756 9.671943c2.073264 0.342872 4.200795 0.516774 6.339427 0.516774 18.341171 0 35.740062-12.213881 41.46528-29.077496l21.105112-57.583951 3.137646-0.627776a278.128177 278.128177 0 0 1 50.462579-4.628769c16.91665 0 33.925801 1.56389 50.556314 4.647269l5.127042 0.857179 18.965247 55.024747c6.764933 20.173931 28.522488 31.060726 45.579741 31.060726h0.890479l61.297573-7.925518 3.318949 3.32265c8.262222 10.342886 16.045904 20.162831 21.778522 31.634234l0.383572 0.768378 0.476074 0.712877c8.418858 12.64432 14.049108 24.502995 17.710928 37.323685l1.466455 5.135676-37.956394 47.459368c-12.608553 15.7832-12.608553 40.498332-0.0037 56.274132l36.087867 43.708745-1.500989 3.758023-0.165269 0.540208c-7.476577 24.290859-20.873242 48.944323-38.743273 71.29142l-3.60632 4.506667-56.987009-9.507908a38.838241 38.838241 0 0 0-6.349294-0.518007c-18.402839 0-35.867097 12.318715-41.526947 29.292099l-19.136682 57.416215-3.293049 0.659844-0.320671 0.078934c-16.155672 4.042926-33.251158 6.092757-50.806685 6.092757z m-41.037306-19.750892l8.010618 1.602124c11.671206 2.332268 23.515081 3.515052 35.203554 3.515051 11.689706 0 23.533581-1.182784 35.204787-3.515051l7.731881-1.546623 17.826863-50.989221c7.486444-22.455632 31.232162-39.390782 55.23565-39.390782 3.106813 0 6.169225 0.298471 9.105834 0.88678l0.43784 0.081401 47.810873 7.976085 4.955607-7.443277c7.037504-10.567356 17.091786-27.052333 25.032103-45.56864l3.388017-7.905783-31.529399-36.798278c-16.94255-20.418135-17.749162-54.340236-1.824127-75.801787l34.415442-42.375492-5.661084-8.473126c-3.897391-5.83622-8.080919-14.22301-12.123846-22.332296l-0.386039-0.775779-18.115468-27.179368-49.739835 5.245444a57.807188 57.807188 0 0 1-7.153439 0.444007c-25.798015 0-50.262776-17.224988-58.173493-40.955905l-15.527896-46.607122-7.839182-1.586091c-11.573771-2.340901-23.42628-3.527385-35.231921-3.527385s-23.659383 1.186484-35.229454 3.527385l-7.560445 1.529356-17.910731 48.618719-0.069068 0.20597c-7.476577 22.454399-31.211195 39.387082-55.208516 39.387082-3.109279 0-6.176625-0.298471-9.116935-0.888013l-0.222003-0.045634-47.030162-7.835483-5.071541 6.08659c-12.142346 14.573282-19.145316 30.938624-25.918883 46.763758l-3.402817 7.948951 33.722298 38.929508c17.258288 20.826374 17.162087 54.859477-0.181303 77.714715l-33.914701 39.161379 4.115694 8.248655c1.228418 2.46177 2.306367 5.049341 3.448451 7.789849 2.527137 6.070556 5.386046 12.937858 10.59819 19.986462 1.258019 1.927728 2.350768 3.972625 3.506419 6.130991 2.247167 4.205729 4.796504 8.970166 8.871497 13.048859l4.929707 4.928473 50.029672-7.513578a57.893522 57.893522 0 0 1 7.005437-0.424273c25.770881 0 50.204809 17.175654 58.142659 40.852304l15.413195 48.869089z m-639.173346 13.254829c-52.98725-0.0074-94.495697-41.550381-94.495697-94.575864V94.548731c0-53.018084 41.510913-94.549964 94.503097-94.549964h736.542752c52.992183 0 94.503097 41.534347 94.503096 94.557364v186.414921c0 5.360146-2.496304 7.856449-7.857683 7.85645-5.346579 0-7.836716-2.49877-7.836715-7.86385V217.301745H233.862661v462.496968c0 44.21072 34.614012 78.843232 78.801298 78.843232h519.916883c5.352746 0 7.845349 2.497537 7.84535 7.857683 0 5.365079-2.492604 7.865083-7.84535 7.865083H312.663959z m0-758.651812c-44.187286 0-78.801298 34.631278-78.801298 78.843232v107.024082h894.158914V94.557364c0-44.211953-34.616478-78.843232-78.807464-78.843232H312.663959z m680.229153 624.259659c-52.992183 0-94.503097-41.536814-94.503097-94.558597 0-53.029184 41.510913-94.567231 94.503097-94.567231 52.988483 0 94.494463 41.539281 94.494463 94.567231 0 24.616464-10.007415 48.184579-28.179617 66.367881-18.168502 18.177135-41.721817 28.18825-66.318546 28.190716h0.0037z m-0.0074-173.404296c-44.187286 0-78.801298 34.632512-78.801298 78.845699 0 44.208253 34.612778 78.835832 78.801298 78.835832 44.194686 0 78.807465-34.627578 78.807464-78.835832 0-44.213187-34.616478-78.845699-78.807464-78.845699zM399.351307 610.512723c-2.872476 0-5.804152-1.907995-7.65788-4.981507l-67.247261-114.176288 67.21766-110.067993c1.394921-2.324868 3.306616-3.455851 5.84362-3.455851 1.779726 0 3.691421 0.583375 5.529115 1.687225l0.952147 0.572275 1.031082 0.411939c0.522941 0.208436 1.313519 0.525408 1.789593 2.333501 0.513074 1.952396 0.329305 4.490633-0.48224 6.948703l-62.111585 101.27543 62.751694 106.980915c1.105083 1.840161 1.36902 3.765422 0.783179 5.716584-0.66971 2.236066-2.343368 4.246429-4.711403 5.670951-1.200051 0.720277-2.439569 1.084116-3.687721 1.084116z m235.925353-3.129013c-1.398621 0-2.856442-0.226937-4.278497-0.66231-1.095216-1.726692-1.761226-6.677365-0.646276-9.334005l62.366888-106.318604-62.777594-102.370647c-2.628272-4.432666-0.297238-9.289604 2.414902-11.692172a7.735581 7.735581 0 0 1 3.494085-0.815246c2.804641 0 5.842386 1.472622 7.719548 3.707455l66.747753 109.287282-67.241094 114.183687c-1.618157 2.662806-4.241496 4.014559-7.799715 4.01456z m-171.127529-10.839927c-1.81426 0-3.729655-0.383572-5.537749-1.105083-0.797978-0.318205-1.419588-1.867294-1.711892-3.098179-0.622843-2.620872-0.439073-5.812786 0.467441-8.52246l107.782592-187.643339c1.621857-2.50617 4.189695-3.777756 7.636913-3.777756 1.440555 0 2.942777 0.240504 4.404299 0.701777 4.012093 3.104346 3.516285 8.630994 2.376668 12.028878l-107.671591 187.45587c-1.615691 2.628272-4.220529 3.960292-7.746681 3.960292zM1027.54659 119.762137c-5.351512 0-7.844116-2.501237-7.844115-7.868783 0-5.357679 2.492604-7.852749 7.844115-7.85275 5.355212 0 7.849049 2.49877 7.84905 7.865083 0.001233 5.360146-2.493837 7.856449-7.84905 7.85645z m-64.990227 0c-5.352746 0-7.845349-2.501237-7.845349-7.868783 0-5.357679 2.492604-7.852749 7.845349-7.85275 5.351512 0 7.844116 2.49877 7.844116 7.865083 0 5.360146-2.492604 7.856449-7.844116 7.85645z m-64.99146 0c-5.346579 0-7.836716-2.501237-7.836716-7.868783 0-5.357679 2.492604-7.852749 7.845349-7.85275 5.355212 0 7.849049 2.49877 7.84905 7.865083 0 5.360146-2.493837 7.857683-7.84905 7.857683h-0.008633z"
                      fill="#848484"
                      p-id="5994"
                    />
                    <path
                      d="M104.55685 889.387077c-2.400102 0-4.145295-0.578442-5.334246-1.766159-1.355453-1.356687-1.768626-2.413669-1.768626-4.531334 0-3.717322 3.38555-7.104105 7.102872-7.104105h4.933406v-0.790578h54.419171c3.717322 0 7.102872 3.379383 7.102872 7.089305 0 3.717322-3.38555 7.101638-7.102872 7.101638h-59.352577zM795.519861 980.356622c-3.473118 0-6.298726-3.184514-6.298726-7.101639 0-3.909724 2.825608-7.091771 6.298726-7.091771h415.461874c3.466951 0 6.287626 3.182047 6.287626 7.091771 0 3.917125-2.820675 7.101638-6.287626 7.101639H795.519861zM1327.27692 981.160767c-3.473118 0-6.298726-3.18698-6.298726-7.104105 0-3.909724 2.825608-7.089305 6.298726-7.089305h90.627906c3.473118 0 6.298726 3.17958 6.298726 7.089305 0 3.917125-2.825608 7.104105-6.298726 7.104105h-90.627906zM356.396138 932.586449c-3.709921 0-7.088071-3.376917-7.088071-7.089305 0-3.717322 3.37815-7.101638 7.088071-7.101638h727.459118c3.717322 0 7.102872 3.384317 7.102872 7.101638 0 3.712388-3.38555 7.089305-7.102872 7.089305H356.396138zM601.824465 1023.998767c-3.701288 0-6.287626-2.592505-6.287626-6.298727 0-3.709921 2.586338-6.298726 6.287626-6.298726h91.444385c3.701288 0 6.286393 2.590038 6.286393 6.298726 0 3.707455-2.585105 6.298726-6.286393 6.298727h-91.444385zM241.69691 889.387077c-3.711155 0-7.090538-3.384317-7.090538-7.101638 0-2.117665 0.413173-3.174647 1.769859-4.5338 0.579675-0.578442 2.527137-1.830294 5.82882-2.555505H426.409806c4.262463 2.681306 7.171939 6.055756 7.656647 7.324875-0.138135 3.623587-3.453384 6.864835-7.086838 6.864835H241.69691zM1018.090484 889.387077c-3.717322 0-7.102872-3.384317-7.102872-7.101638 0-1.801927 1.027382-3.788856 1.768627-4.531334 0.742478-0.742478 2.72694-1.768626 4.531333-1.768626h145.975791c2.834242 0 6.417128 3.416384 7.079438 6.651465-0.204736 3.57672-3.486685 6.750133-7.079438 6.750133H1018.090484zM22.082631 988.231571c-3.708688 0-6.298726-2.592505-6.298726-6.298726 0-3.709921 2.590038-6.298726 6.298726-6.298726h566.246502c3.708688 0 6.29996 2.590038 6.299959 6.298726 0 3.707455-2.591272 6.298726-6.299959 6.298726h-566.246502z"
                      fill="#848484"
                      p-id="5995"
                    />
                  </svg>
                }
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card
              bodyStyle={{ padding: 30 }}
              bordered={analysisLoading}
              className={styles.billingStatement}
              title="近12个月消费趋势"
              loading={false}
            >
              <Chart
                scale={{ y: { min: 0, alias: '本月消费', formatter: (d: number) => `￥ ${d}` } }}
                autoFit
                height={300}
                data={consumptionTrend}
              >
                <Line
                  shape="smooth"
                  position="x*y"
                  color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                />
              </Chart>
            </Card>
          </Col>
        </Row>
      </PageContainer>
    );
  }
}

export default connect(
  ({
    welcome: { amount, consumptionTrend },
    loading,
  }: {
    welcome: ModalState;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    amount,
    consumptionTrend,
    analysisLoading: loading.effects['welcome/fetchAnalysis'],
  }),
)(Welcome);
