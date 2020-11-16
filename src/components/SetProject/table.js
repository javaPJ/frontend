
import React from 'react';
import TableList from './tableList';
import './SetProject.scss'

const table = ({team, onRemove}) => {
    return(
        <div>
            <header className = "header-setProject">
                <span className = "List-setProject">이름</span>
                <span className = "List-setProject">이메일</span>
                <span className = "List-setProject">최근 접속일</span>
                <span className = "List-setProject">강퇴</span>
            </header>
            <div>
                {team.map(teamates => (
                    <TableList team = {teamates} onRemove = {onRemove} />
                ))}
            </div>
        </div>
    );
};

export default table;