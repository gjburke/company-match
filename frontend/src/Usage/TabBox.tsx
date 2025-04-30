import { useState } from 'react';
import './TabBox.css';

export default function TabBox() {
  const [activeTab, setActiveTab] = useState('Home');

  const renderContent = () => {
    switch (activeTab) {
      case 'Company Values':
        return <p>You could describe what company values you expect.<br/> Example: Innovation</p>;
      case 'Company Culture':
        return <p>You could describe what company culture do you prefer.<br/> Example: Customer-Focused Culture</p>;
      case 'Hiring Situation':
        return <p>You could specify hiring situation of the desired company. <br/> Example: Hiring Seniors or above</p>;
      case 'General Description':
        return <p>Most importantly, you could provide a general description on your desired company. <br/> Example: under five hundred employees, tech company</p>;
      default:
        return <p></p>;
    }
  };

  return (
    <div className="tab-box">
      <nav className="tab-nav">
        {['Company Values', 'Company Culture', 'Hiring Situation', 'General Description'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </nav>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
};
