import { goBackOr } from './goBackOr';

function makeRouter(canGoBack: boolean) {
  return { canGoBack: () => canGoBack, back: jest.fn(), replace: jest.fn() };
}

describe('goBackOr', () => {
  it('goes back when there is history', () => {
    const router = makeRouter(true);
    goBackOr(router, '/tickets');
    expect(router.back).toHaveBeenCalled();
    expect(router.replace).not.toHaveBeenCalled();
  });

  it('opens the fallback when there is no history', () => {
    const router = makeRouter(false);
    goBackOr(router, '/tickets');
    expect(router.replace).toHaveBeenCalledWith('/tickets');
    expect(router.back).not.toHaveBeenCalled();
  });
});
