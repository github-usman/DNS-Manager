import React, { useContext, useState } from 'react';
import styles from './dnsCreationForm.module.css';
import { DnsContext } from '../../../context-api/DnsContext';
import { RxCross2 } from 'react-icons/rx';
import DomainCreateMultiple from '../create-dns-records-multiple/DnsRecordsCreateMultiple';
import DomainCreateSingle from '../create-dns-records-single/DnsCreateSingle';

function DNSCreationForm({ HostedZoneId }) {
    const { domainCreatePage, setDomainCreatePage } = useContext(DnsContext);
    const [active, setActive] = useState('multipleDomain');

    // toogle the create page
    const handlePageCreate = () => {
        const revertOfCreate = !domainCreatePage;
        setDomainCreatePage(revertOfCreate);
    };

    const handleActiveMethods = (val) => {
        setActive(val)
    }

    return (
        <div className={styles.container} style={{ display: `${domainCreatePage === true ? 'flex' : 'none'}`, }} >
            <div
                style={{ display: 'flex', justifyContent: 'space-between', width: '100%', }} >
                <h2>Create DNS Records in Bulk or Single </h2>
                <div className={styles['li']} onClick={handlePageCreate}>
                    {domainCreatePage ? (
                        <button className={styles.icons}> <RxCross2 /> </button>) : ('')}
                </div>
            </div>

            <div className={active === 'default' ? styles.btnContainer : styles.noBtnContainer}>
                <button className={styles.btn} onClick={() => handleActiveMethods('singleDomain')}>Create Single Records</button>
                <button className={styles.btn} onClick={() => handleActiveMethods('multipleDomain')}>Create Multiple Records</button>
            </div>

            {active === 'singleDomain' && <DomainCreateSingle handleActiveMethods={handleActiveMethods} HostedZoneId={HostedZoneId} />}
            {active === 'multipleDomain' && <DomainCreateMultiple handleActiveMethods={handleActiveMethods} HostedZoneId={HostedZoneId} />}

        </div>
    );
}

export default DNSCreationForm;
