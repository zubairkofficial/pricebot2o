import React from 'react';
import { useHeader } from './HeaderContext';

export default function Header() {
  const { headerData } = useHeader();

  return (
    <header className="nftmax-header">
      <div className="container-fluid">
        <div className="row g-50">
          <div className="col-12">
            <div className="nftmax-header__inner">
              <div className="header-left">
                <div className="header-text">
                  <h3>{headerData.title}</h3>
                  <p>{headerData.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
