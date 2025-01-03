---
hide_title: true
---

import TechTree from '@site/src/components/TechTree';

<div style={{
  position: 'fixed',
  top: '60px',
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80px',
  backgroundColor: 'var(--token-primary-bg-c)',
  zIndex: 100,
  borderBottom: '1px solid var(--ifm-navbar-shadow)'
}}>
  <h1 style={{ margin: 0, fontSize: '2rem' }}>Interactive Technology Tree</h1>
</div>

<div style={{ marginTop: '200px' }}>
  <TechTree />
</div>
