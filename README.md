# 원티드 프리온보딩 인턴십 2주차 과제

## API 호출별로 로컬 캐싱 구현

- 세션 스토리지 이용

```ts
// 세션 스토리지에 저장된 캐시가 만료되지 않았을 시 API 호출하지 않고 캐시를 이용
const cache = sessionStorage.getItem(`${AUTOCOMPLETE_CACHE_KEY}${word}`);

if (cache) {
  const parsedCache = JSON.parse(cache);
  const currentDate = Date.now();

  if (currentDate > parsedCache.expiresTimestamp) {
    sessionStorage.removeItem(`${AUTOCOMPLETE_CACHE_KEY}${word}`);
  } else return parsedCache.words;
}
```

```ts
// API 응답 데이터를 세션 스토리지에 저장
sessionStorage.setItem(
  `${AUTOCOMPLETE_CACHE_KEY}${word}`,
  JSON.stringify({ ...getCacheExpireTime(), words }),
);
```

### expire time 구현

```ts
// 현재 시점으로부터 유효기간만큼 더한 시점을 캐시 만료 시점으로 설정
const getCacheExpireTime = () => {
  const now = new Date();

  const expiresAt = new Date(now.getTime() + MAX_AGE);
  const expiresTimestamp = expiresAt.getTime();

  return { expiresAt: expiresAt.toString(), expiresTimestamp };
};
```

## 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략: 디바운싱

입력값을 디바운싱하여 입력이 끝나고 0.3초가 지났을 때의 입력값으로 API를 호출함.

```ts
// useDebounce 커스텀 훅
import { useEffect, useState } from 'react';

const useDebounce = (input: string, delay = 300) => {
  const [debounceText, setDebounceText] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceText(input);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [input, delay]);

  return debounceText;
};

export default useDebounce;

```
    
## 키보드만으로 추천 검색어들로 이동 가능하도록 구현

### 추천 검색어를 대화형 요소 `<button>` 태그로 설정

시맨틱 마크업을 위해 추천 검색어를 `<li>` 태그로 설정하였으나, `<li>` 태그는 비대화형 요소이기 때문에 접근성 트리에 나타나지 않아 키보드 `tab` 키로 접근할 수 없음.
접근성 트리에 포함될 수 있도록 비대화형 요소인 `<li>` 태그를 대화형 요소인 `<button>` 태그로 바꾸어 키보드 `tab` 키를 통해 접근 가능하도록 함.

> #### tabindex 속성을 사용하지 않은 이유
> 비대화형 요소를 사용해 만든 대화형 컴포넌트는 접근성 트리에 나타나지 않으므로, 보조 기술이 해당 컴포넌트로 탐색하거나 조작하는 것을 방지합니다. 상호작용 가능한 항목은 대화형 요소를 사용해 적절한 의미와 함께 나타내야 합니다.
> 
> 참고: [접근성 고려사항 - MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/tabindex#%EC%A0%91%EA%B7%BC%EC%84%B1_%EA%B3%A0%EB%A0%A4%EC%82%AC%ED%95%AD)

![May-05-2023 21-54-26](https://user-images.githubusercontent.com/91963656/236463328-6a77b69c-24d4-4919-97f4-5899b71da7b7.gif)


