import { offerRowActions, pillStatus } from './offerActions';

describe('offerRowActions', () => {
  it('lets a live offer be edited, paused, duplicated and ended', () => {
    expect(offerRowActions('live')).toEqual(['edit', 'pause', 'duplicate', 'end']);
    expect(offerRowActions('scheduled')).toEqual(['edit', 'pause', 'duplicate', 'end']);
  });

  it('lets a paused offer be resumed', () => {
    expect(offerRowActions('paused')).toContain('resume');
    expect(offerRowActions('paused')).not.toContain('pause');
  });

  it('only duplicates an ended offer and cannot end a draft', () => {
    expect(offerRowActions('ended')).toEqual(['duplicate']);
    expect(offerRowActions('draft')).not.toContain('end');
  });
});

describe('pillStatus', () => {
  it('calls a live offer active', () => {
    expect(pillStatus('live')).toBe('active');
    expect(pillStatus('paused')).toBe('paused');
  });
});
