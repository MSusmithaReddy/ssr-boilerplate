import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { actionCreators, selectors } from '../../store/home';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './index.css';
import { Router } from '../../routes';


const years = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', ,'2017', '2018', '2019', '2020']

class Landing extends React.Component {
  constructor(props){
      super(props);
      const queryString = typeof window !== 'undefined' && window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const year = urlParams.get('yr');
      const launch = urlParams.get('sla');
      const landing = urlParams.get('sld');
      this.state = {
          selectedYear: year,
          successLaunch: launch,
          successLanding: landing,
      }
  }
  
getDataBasedOnYear = (year) => () => {
    const { successLaunch, successLanding } = this.state;

    this.setState({
        selectedYear: year,
    });
    Router.pushRoute(`/filter?yr=${year}${successLaunch !== null ? `&sla=${successLaunch}`: ''}${successLanding !== null ? `&sld=${successLanding}`: ''}`);
}

onSuccessfulLaunch = (data) => () => {
    const { selectedYear, successLanding } = this.state;
    this.setState({
        successLaunch: data,
    });
    Router.pushRoute(`/filter${selectedYear ? `?yr=${selectedYear}` : ''}${selectedYear ? '&' : '?'}sla=${data}${successLanding !== null ? `&sld=${successLanding}`: ''}`);
}
onSuccessfulLanding = (data) => () => {
    const { selectedYear, successLaunch } = this.state;
    this.setState({
        successLanding: data,
    });
    Router.pushRoute(`/filter${selectedYear ? `?yr=${selectedYear}` : ''}${successLaunch !== null ? `&sla=${successLaunch}`: ''}${(selectedYear !== null || successLaunch !== null) ? '&' : '?'}sld=${data}`);
}
 render() {
     const { homePageData } = this.props;
     const { selectedYear, successLaunch, successLanding } = this.state;
     return (
        <React.Fragment>
         <span>
             <h3>SpaceX Launch Programs</h3>
             <Row className={`${styles.row}`}>
            <Col md={2} sm={2} xs={2} className={`${styles.float} ${styles['background-white']} ${styles['border-radius']}`}>
                  <div>Flters</div>
                  <div>
                  <div>
                   <div>Launch Year</div>
                   <div className={styles.years}>
                   {years.map(val => {
                       return <div className={`${styles.year} ${val === selectedYear ? styles['dark-green'] : ''}`} onClick={this.getDataBasedOnYear(val)}>{val}</div>
                   })}
                   </div>
                   </div>
                   <div>
                   <div>Successful Launch</div>
                   <span className={`${styles.year} ${true === successLaunch ? styles['dark-green'] : ''}`} onClick={this.onSuccessfulLaunch(true)}>True</span>
                   <span className={`${styles.year} ${false === successLaunch ? styles['dark-green'] : ''}`} onClick={this.onSuccessfulLaunch(false)}>false</span>
                   </div>
                   <div>
                   <div>Successful Landing</div>
                   <span className={`${styles.year} ${true === successLanding ? styles['dark-green'] : ''}`} onClick={this.onSuccessfulLanding(true)}>True</span>
                   <span className={`${styles.year} ${false === successLanding ? styles['dark-green'] : ''}`} onClick={this.onSuccessfulLanding(false)}>false</span>
                   </div>
                   </div>
                 </Col>
                 <Col md={10} className={styles.mainContainer}>
                    {homePageData && homePageData.length > 0 ? homePageData.map(val => {
                        return (
                            <span className={`${styles['background-white']} ${styles['main-data']}`}>
                           <img src={val.links.mission_patch_small} className={styles['image']} alt="img"/>
                           <span className={styles['spaceName']}>{val.rocket.rocket_name}</span>
                           <span>
                             <span className={styles['subCategories']}>Mission Ids:</span>
                               <ul>
                                   <li>{val.mission_id && val.mission_id.length > 0 ? val.mission_id : 'No Id'}</li>
                               </ul>
                           </span>
                           <span>
                             <span className={styles['subCategories']}>Launch Year:</span>
                               <span>{val.launch_year}</span>
                           </span>
                           <span>
                             <span className={styles['subCategories']}>Successful Launch: </span>
                               {`${val.launch_success}`}
                           </span>
                           <span>
                             <span className={styles['subCategories']}>Successful Landing: </span>
                               {`${val.launch_landing !== undefined ? val.launch_landing : 'NA'}`}
                           </span>
                           </span>
                        )
                    }): <h4>No programs to display</h4>}
                 </Col>
             </Row>
         </span>
     <span style={{ display: 'flex', alignItems:'center', justifyContent: 'center' }}><h5>Developed by :</h5> <span>M Susmitha Reddy</span></span>
     </React.Fragment>
     )
 }
}
const mapStateToProps = store => ({
    homePageData: selectors.getHomePageData(store),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSpaceXData: actionCreators.getSpaceXData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Landing);