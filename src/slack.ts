/* eslint-disable camelcase */

export const BASE_URL = 'https://slack.com/api';

/** emoji.listのレスポンスに標準で含まれる絵文字 */
export const defaultEmojis = [
  'bowtie',
  'cubimal_chick',
  'dusty_stick',
  'glitch_crab',
  'piggy',
  'pride',
  'simple_smile',
  'slack_call',
  'slack',
  'squirrel',
  'thumbsup_all'
];
/** emoji.listのレスポンスに標準で含まれるエイリアス */
export const defaultAliases = ['black_square', 'white_square', 'shipit'];

/** ワークスペース名 */
export const workSpaceName = window.location.href.match(/.*:\/\/(.*).slack.com\/.*/)?.[1];

export interface EmojiListResult extends WebAPICallResult {
  emoji: { [key: string]: string };
}

export interface WebAPICallResult {
  ok: boolean;
  error?: string;
  response_metadata?: {
    warnings?: string[];
    next_cursor?: string;
    scopes?: string[];
    acceptedScopes?: string[];
    retryAfter?: number;
    messages?: string[];
  };
  [key: string]: unknown;
}

/** API情報 */
export const slackApiData = (() => {
  let apiToken = '';
  let versionUid = '';

  // scriptをリストにする
  const scriptList: HTMLElement[] = [];
  document.querySelectorAll<HTMLElement>('script[type="text/javascript"]').forEach(script => scriptList.push(script));

  // 埋め込まれているscriptからTokenなどを取得
  scriptList.some(script => {
    const isBootDataScript = /var\sboot_data\s=\s\{/.test(script.innerText);

    if (!isBootDataScript) {
      return false;
    }

    const apiTokenResult = /"?api_token"?:\s*"(.+?)"/g.exec(script.innerText);
    const versionUidResult = /"?version_uid"?:\s*"(.+?)"/g.exec(script.innerText);

    apiToken = apiTokenResult?.[1] ?? '';
    versionUid = versionUidResult?.[1] ?? '';
    return true;
  });

  return {
    apiToken,
    versionUid
  };
})();
