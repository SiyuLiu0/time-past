import React from 'react';

export function Homepage(){
    const [dateState, setDateState] = React.useState(new Date());
    const dayPassed = (100 * dateState.getHours()/24).toFixed(2) + "%";
    const monthPassed = (100 * dateState.getDate() / new Date( dateState.getFullYear(), dateState.getMonth()+1, 0).getDate() ).toFixed(2) + "%";
    const yearPassed = (100 * getYearPassed() / (isLeapYear()? 366 : 365)).toFixed(2) + "%";

    React.useEffect(() => {
        setInterval(() => setDateState(new Date()), 500);
    }, []);

    function renderNotes(){
        return (
                <div className="row text-center">
                    <div className="col-3"></div>
                    <div className="col">
                        <span>Time past</span>
                        <div className="passed col p-2 mb-2 border  border-3 rounded bg-secondary"></div>
                    </div>
                    <div className="col-2"></div>
                    <div className="col">
                        <span >Time left</span>
                        <div className="left col p-2 mb-2 border  border-3 rounded"></div>
                    </div>
                    <div className="col-3"></div>
                </div>
        )
    }

    function renderTimeThisYear(){
        return (
            <div>
                <p className="lh-lg"><span className="align-content-center">
                    Time past this year: {yearPassed}
                </span></p>
                <div className="time row p-2 mb-2 border  border-3
            rounded col">
                    <div className="passed rounded" style={{width:yearPassed}}></div>
                </div>
            </div>
        )
    }

    function renderTimeThisMonth(){
        return (
            <div>
                <p className="lh-lg"><span className="align-content-center">
                    Time past this Month: {monthPassed}
                </span></p>
                <div className="time row p-2 mb-2 border  border-3
            rounded col">
                    <div className="passed rounded" style={{width:monthPassed}}></div>
                </div>
            </div>
        )
    }

    function renderTimeToday(){
        return (
            <div className="mb-10">
                <p className="lh-lg"><span className="align-content-center">
                    Time past today: {dayPassed}
                </span></p>
                <div className="time row p-2 mb-2 border  border-3
            rounded col">
                    <div className="passed rounded" style={{width:dayPassed}}></div>
                </div>
            </div>
        )
    }

    return (
        <div className="App text-dark container font-monospace">
            <p className="text-center fs-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                     className="bi bi-calendar-check" viewBox="0 0 16 16">
                    <path
                        d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    <path
                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                </svg>
                {' '}
                {dateState.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })}
            </p>
            <p className="text-center fs-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                     className="bi bi-clock" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg>
                {' '}
                <span>
                    {dateState.toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: false,
                    })}
                </span>
            </p>
            <div className="d-grid gap-4 fw-bold mt-5">
                {renderNotes()}
                {renderTimeToday()}
                {renderTimeThisMonth()}
                {renderTimeThisYear()}
            </div>
        </div>
    );

    function getYearPassed(){
        const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        const mn = dateState.getMonth();
        const dn = dateState.getDate();
        let dayOfYear = dayCount[mn] + dn;
        if(mn > 1 && isLeapYear()) dayOfYear++;
        return dayOfYear;
    }

  function isLeapYear() {
        const year = dateState.getFullYear();
        if((year & 3) !== 0) return false;
        return ((year % 100) !== 0 || (year % 400) === 0);
    };

}