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
  
getDataBasedOnYear = (value) => () => {
    const { successLaunch, successLanding } = this.state;
    const year = this.state.selectedYear === value ? null : value;
    debugger;
    this.setState({
        selectedYear: year,
    });
    Router.pushRoute(`/filter${year ? `?yr=${year}` : ''}${successLaunch !== null ? `${year ? '&' : '?'}sla=${successLaunch}`: ''}${successLanding !== null ? `${successLaunch || year ? '&' : '?'}sld=${successLanding}`: ''}`);
}

onSuccessfulLaunch = (value) => () => {
    const { selectedYear, successLanding } = this.state;
    const data = this.state.successLaunch === String(value) ? null : String(value);
    debugger;
    this.setState({
        successLaunch: data,
    });
    Router.pushRoute(`/filter${selectedYear ? `?yr=${selectedYear}` : ''}${selectedYear ? '&' : '?'}sla=${data ? data : ''}${successLanding !== null ? `&sld=${successLanding}`: ''}`);
}
onSuccessfulLanding = (value) => () => {
    const { selectedYear, successLaunch } = this.state;
    const data = this.state.successLanding === String(value) ? null : String(value);
    this.setState({
        successLanding: data,
    });
    Router.pushRoute(`/filter${selectedYear ? `?yr=${selectedYear}` : ''}${selectedYear ? '&' : '?'}sla=${successLaunch ? successLaunch : ''}${(selectedYear !== null || successLaunch !== null) ? '&' : '?'}sld=${data ? data : ''}`);
}
 render() {
     const { homePageData, getLoadingStatus } = this.props;
     const { selectedYear, successLaunch, successLanding } = this.state;
     debugger;
     return (
        <React.Fragment>
         <span>
             <h3>SpaceX Launch Programs</h3>
             <Row className={`${styles.row}`}>
            <Col md={2} className={`${styles.float} ${styles['background-white']} ${styles['border-radius']}`}>
                  <div className={`${styles['filters']}`}>Filters</div>
                  <div>
                  <div>
                   <div className={`${styles['filter-heading']}`}>Launch Year</div>
                   <div className={styles.years}>
                   {years.map(val => {
                       return <button className={`${styles.year} ${val === selectedYear ? styles['dark-green'] : ''}`} onClick={this.getDataBasedOnYear(val)}>{val}</button>
                   })}
                   </div>
                   </div>
                   <div>
                   <div className={`${styles['filter-heading']}`}>Successful Launch</div>
                   <button className={`${styles.year} ${"true" === successLaunch ? styles['dark-green'] : ''}`} onClick={this.onSuccessfulLaunch(true)}>True</button>
                   <button className={`${styles.year} ${"false" === successLaunch ? styles['dark-green'] : ''}`} onClick={this.onSuccessfulLaunch(false)}>False</button>
                   </div>
                   <div>
                   <div className={`${styles['filter-heading']}`}>Successful Landing</div>
                   <button className={`${styles.year} ${"true" === successLanding ? styles['dark-green'] : ''}`} onClick={this.onSuccessfulLanding(true)}>True</button>
                   <button className={`${styles.year} ${"false" === successLanding ? styles['dark-green'] : ''}`} onClick={this.onSuccessfulLanding(false)}>False</button>
                   </div>
                   </div>
                 </Col>
                 <Col md={10} className={styles.mainContainer}>
                    {getLoadingStatus ? 'Loading.....' : homePageData && homePageData.length > 0 ? homePageData.map(val => {
                        return (
                            <span className={`${styles['background-white']} ${styles['main-data']}`}>
                           <img src={val.links.mission_patch_small} className={styles['image']} alt="img"/>
                           <span className={styles['spaceName']}>{val.rocket.rocket_name}</span>
                           <span>
                             <span className={styles['subCategories']}>Mission Ids: </span>
                                <span>{val.mission_id && val.mission_id.length > 0 ? val.mission_id : 'NA'}</span>
                           </span>
                           <span>
                             <span className={styles['subCategories']}>Launch Year: </span>
                               <span>{val.launch_year}</span>
                           </span>
                           <span>
                             <span className={styles['subCategories']}>Successful Launch: </span>
                               {`${val.launch_success}`}
                           </span>
                           <span>
                             <span className={styles['subCategories']}>Successful Landing: </span>
                               {`${val.rocket.first_stage.cores[0].land_success !== null ? val.rocket.first_stage.cores[0].land_success : 'NA'}`}
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
    getLoadingStatus: selectors.getLoadingStatus(store),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSpaceXData: actionCreators.getSpaceXData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
