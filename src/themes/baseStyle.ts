import { createStyles } from "antd-style";

export const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      border-width: 0;
      border-radius: 4px;
      heigh: 40px;
      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: rgba(247, 127, 0, 1);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.16) 0%,
            rgba(255, 255, 255, 0.16) 100%
          ),
           #ff6b00;
      }
    }
  `,

  textLink: css`
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: rgba(3, 101, 229, 1);
  `,
  textLabel: css`
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: rgba(0, 0, 0, 1);
  `,
  textBodyPrimary: css`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: rgba(0, 0, 0, 1);
  `,
  textBodySecondary: css`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: rgba(180, 180, 180, 1);
  `,

  textCaptionSecondary: css`
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: rgba(180, 180, 180, 1);
  `,

  borderGradient: css`
    position: relative;
    padding: 3px;
    border-radius: 8px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      z-index: 0;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      border-radius: inherit;
      background: linear-gradient(160deg, #ffffff 0%, #2a78d0 100%);
    }
  `,
  scrollableContent: css`
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari: Ẩn thanh cuộn */
    }
  `,
  twoBg: css`
    position: relative;
    background: linear-gradient(103deg, #2460bc 21.69%, #2a78d0 100.63%) 0 0 /
        100% 50%,
      /* Gradient chiếm phần trên */ white 50% / 100% 50%;
    background-size: 100% 100%;
  `,
}));
