import { assertEquals } from 'jsr:@std/assert@1';
import { filterFeedText } from './feed-filter.ts';

const allowed = [
  'Вчора був космос у Котельні 🔥',
  'Який сет у DJ Max був! Звук просто вогонь',
  'New sound system at the bar sounds amazing',
  'Хто був минулої ночі? Розкажіть враження',
  'Дякую всім, було 100 людей і неймовірна атмосфера',
  'Крутий вечір, ледве дійшов додому о третій ночі',
];

for (const text of allowed) {
  Deno.test('allows: ' + text, () => assertEquals(filterFeedText(text), null));
}

const promo = [
  'Приходьте сьогодні о 22:00, вхід 200 грн',
  '−20% з промокодом HOLA',
  '-20% на всі коктейлі',
  'Квитки вже в продажу',
  'Знижка для студентів',
  'Вхід від 21:00',
  'Вхід 150₴',
  'Entry 10 UAH tonight',
  '15 грудня о 21:30 велика вечірка',
  'Promo code HOLA',
  'Прomокод HOLA',
  'Пpиходьте завтра о 20:00',
];

for (const text of promo) {
  Deno.test('rejects promo: ' + text, () => assertEquals(filterFeedText(text), 'promo'));
}

const links = [
  'Дивись https://example.com/party',
  'Пиши на www.club.ua',
  'всі деталі: club.com.ua',
  'гайда t.me/holafest',
  'мій сайт club (dot) com',
];

for (const text of links) {
  Deno.test('rejects links: ' + text, () => assertEquals(filterFeedText(text), 'links'));
}

const abuse = ['Ти мудак', 'f u c k you', 'ти пиздец', 'You are a b1tch'.replace('1', 'i')];

for (const text of abuse) {
  Deno.test('rejects abuse: ' + text, () => assertEquals(filterFeedText(text), 'abuse'));
}

Deno.test('rejects the title of an upcoming event, case-insensitively', () => {
  const upcoming = [{ title: 'Котельня Night' }];
  assertEquals(filterFeedText('Усім привіт, котельня night — це буде щось', upcoming), 'promo');
  assertEquals(filterFeedText('Усім привіт, Котельня була супер', upcoming), null);
});

Deno.test('ignores very short event titles', () => {
  assertEquals(filterFeedText('Було круто, дякую', [{ title: 'Ok' }]), null);
});
