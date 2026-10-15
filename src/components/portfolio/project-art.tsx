export function ProjectArt({ kind }: { kind: 'flow' | 'pulse' | 'form' }) {
  return <div className={`project-art art-${kind}`} aria-hidden="true"><div className="mini-window">
    <div className="mini-header"><i /><i /><i /></div>
    {kind === 'flow' && <><div className="mini-label">flow / workspace</div><div className="mini-columns">{[0,1,2].map(n => <div key={n}><i /><i />{n === 0 && <i />}</div>)}</div></>}
    {kind === 'pulse' && <><div className="mini-label">Overview</div><div className="mini-stat">24,890<small>+12.8%</small></div><svg className="mini-chart" viewBox="0 0 120 45"><path d="M0 38 L13 30 L24 34 L37 22 L49 26 L62 12 L73 18 L87 10 L100 15 L120 2" /></svg></>}
    {kind === 'form' && <><div className="mini-label">formly.</div><div className="mini-form-title">Make it happen.</div><div className="mini-field"/><div className="mini-field"/><div className="mini-submit"/></>}
  </div></div>;
}
