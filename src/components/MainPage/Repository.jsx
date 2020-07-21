import React from 'react';
import style from './Repository.module.css'
import { NavLink } from 'react-router-dom';


const Repository = ({ repo, setSelectedRepository }) => {
    return (
        <div className="">

            <div style={{ textAlign: 'center' }}>
                <div className={style.repositoryItem}>
                    <div>
                        <div><span>Name:</span>  {repo.name}</div>
                        <div><span>Stars:</span>  {repo.stargazers_count}</div>
                        <div><span>Last Commit Date:</span>  {repo.pushed_at.replace('T', ' ').replace('Z', '')}</div>
                        <NavLink to={`/repository-card/${repo.id}`} onClick={() => setSelectedRepository(repo.id)} >
                            Go To Repository Card
                        </NavLink>
                    </div>
                    <div>
                        <a href={repo.html_url}>Go To Repository GitHub</a>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Repository;