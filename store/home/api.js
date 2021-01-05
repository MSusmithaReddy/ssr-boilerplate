import axios from 'axios';

const getSpaceXData = (data) => {
    console.log('abcdjhhkjh', data);
    const year = data.yr;
    const successlaunch = data.sla;
    const successLanding = data.sld;
    debugger;
    return axios.get(`https://api.spaceXdata.com/v3/launches?limit=100${year ? `&launch_year=${year}` : ''}${successlaunch ? `&launch_success=${successlaunch}` : ''}${successLanding ? `&land_success=${successLanding}` : ''}`);
}

export default { getSpaceXData };