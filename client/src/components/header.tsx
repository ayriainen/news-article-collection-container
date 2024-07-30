import { ModeToggle } from './ui/mode-toggle';
import { Button } from './ui/button';
import { ExitIcon } from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';

export default function Header({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center">
          <img
            className="mx-2"
            width="30"
            src="https://avatars.githubusercontent.com/u/80965139?s=200&v=4"
            alt="Logo"
          />
          <h3 className="scroll-m-20 text-2xl font-medium tracking-tight">
            News Article Collector
          </h3>
        </div>
        <div className="flex items-center">
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Button onClick={onLogout} variant="ghost" className="mr-1" size="icon">
                <ExitIcon className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p>Logout</p>
            </Tooltip.Content>
          </Tooltip.Root>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Button asChild variant="ghost" className="mr-1" size="icon">
                <a
                  href="https://github.com/uh-dcm/news-article-collection-container"
                  aria-label="GitHub repository"
                >
                  {/*github icon by Free Icons (https://free-icons.github.io/free-icons/)*/}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[1.2rem] w-[1.2rem]"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path d="M 171.3548387096774 407.741935483871 Q 170.32258064516128 411.8709677419355 166.19354838709677 411.8709677419355 Q 160 411.8709677419355 160 407.741935483871 Q 161.03225806451613 404.64516129032256 165.16129032258064 404.64516129032256 Q 170.32258064516128 404.64516129032256 171.3548387096774 407.741935483871 L 171.3548387096774 407.741935483871 Z M 139.3548387096774 403.61290322580646 Q 138.32258064516128 406.7096774193548 143.48387096774192 408.7741935483871 Q 148.6451612903226 409.80645161290323 149.67741935483872 406.7096774193548 Q 150.70967741935485 402.5806451612903 145.5483870967742 401.5483870967742 Q 140.38709677419354 400.51612903225805 139.3548387096774 403.61290322580646 L 139.3548387096774 403.61290322580646 Z M 184.7741935483871 401.5483870967742 Q 179.61290322580646 402.5806451612903 179.61290322580646 406.7096774193548 Q 180.6451612903226 409.80645161290323 185.80645161290323 409.80645161290323 Q 190.96774193548387 407.741935483871 190.96774193548387 404.64516129032256 Q 189.93548387096774 401.5483870967742 184.7741935483871 401.5483870967742 L 184.7741935483871 401.5483870967742 Z M 252.90322580645162 6.193548387096774 Q 142.4516129032258 8.258064516129032 72.25806451612904 78.45161290322581 L 72.25806451612904 78.45161290322581 L 72.25806451612904 78.45161290322581 Q 2.064516129032258 148.6451612903226 0 258.06451612903226 Q 1.032258064516129 345.80645161290323 48.516129032258064 411.8709677419355 Q 96 477.93548387096774 175.48387096774192 504.7741935483871 Q 194.06451612903226 505.80645161290323 193.03225806451613 492.38709677419354 Q 193.03225806451613 488.258064516129 193.03225806451613 476.9032258064516 Q 193.03225806451613 453.16129032258067 193.03225806451613 429.4193548387097 Q 190.96774193548387 429.4193548387097 173.41935483870967 431.48387096774195 Q 154.83870967741936 432.51612903225805 134.19354838709677 427.35483870967744 Q 113.54838709677419 421.16129032258067 105.29032258064517 398.4516129032258 Q 105.29032258064517 396.38709677419354 97.03225806451613 381.93548387096774 Q 88.7741935483871 368.51612903225805 76.38709677419355 360.258064516129 Q 74.3225806451613 359.2258064516129 68.12903225806451 352 Q 60.903225806451616 345.80645161290323 78.45161290322581 344.7741935483871 Q 79.48387096774194 343.741935483871 92.90322580645162 348.9032258064516 Q 106.3225806451613 353.03225806451616 117.6774193548387 371.61290322580646 Q 136.25806451612902 399.48387096774195 157.93548387096774 399.48387096774195 Q 180.6451612903226 399.48387096774195 193.03225806451613 393.2903225806452 Q 197.16129032258064 368.51612903225805 209.5483870967742 358.19354838709677 Q 164.1290322580645 356.1290322580645 130.06451612903226 335.48387096774195 Q 96 315.8709677419355 93.93548387096774 243.61290322580646 Q 93.93548387096774 222.96774193548387 100.12903225806451 209.5483870967742 Q 105.29032258064517 196.1290322580645 117.6774193548387 183.74193548387098 Q 115.61290322580645 177.5483870967742 113.54838709677419 158.96774193548387 Q 111.48387096774194 140.38709677419354 120.7741935483871 113.54838709677419 Q 139.3548387096774 110.45161290322581 164.1290322580645 124.90322580645162 Q 189.93548387096774 138.32258064516128 192 141.41935483870967 Q 192 141.41935483870967 192 141.41935483870967 Q 222.96774193548387 132.1290322580645 257.03225806451616 132.1290322580645 Q 290.06451612903226 132.1290322580645 322.06451612903226 141.41935483870967 Q 322.06451612903226 140.38709677419354 335.48387096774195 132.1290322580645 Q 347.8709677419355 123.87096774193549 364.38709677419354 117.6774193548387 Q 380.9032258064516 110.45161290322581 393.2903225806452 113.54838709677419 Q 402.5806451612903 140.38709677419354 400.51612903225805 158.96774193548387 Q 398.4516129032258 177.5483870967742 395.35483870967744 183.74193548387098 Q 407.741935483871 196.1290322580645 414.96774193548384 209.5483870967742 Q 422.19354838709677 222.96774193548387 422.19354838709677 243.61290322580646 Q 421.16129032258067 293.16129032258067 404.64516129032256 316.9032258064516 Q 387.0967741935484 339.61290322580646 360.258064516129 347.8709677419355 Q 333.4193548387097 356.1290322580645 303.48387096774195 358.19354838709677 Q 320 369.5483870967742 321.03225806451616 405.6774193548387 Q 321.03225806451616 443.8709677419355 321.03225806451616 473.80645161290323 Q 321.03225806451616 487.2258064516129 321.03225806451616 492.38709677419354 Q 320 505.80645161290323 338.5806451612903 504.7741935483871 Q 417.03225806451616 477.93548387096774 464.51612903225805 411.8709677419355 Q 510.96774193548384 345.80645161290323 512 258.06451612903226 Q 510.96774193548384 185.80645161290323 476.9032258064516 129.03225806451613 Q 441.80645161290323 72.25806451612904 384 39.225806451612904 Q 325.16129032258067 7.225806451612903 252.90322580645162 6.193548387096774 L 252.90322580645162 6.193548387096774 Z M 100.12903225806451 362.3225806451613 Q 98.06451612903226 364.38709677419354 101.16129032258064 367.48387096774195 Q 104.25806451612904 370.5806451612903 106.3225806451613 368.51612903225805 Q 108.38709677419355 366.4516129032258 105.29032258064517 363.35483870967744 Q 103.2258064516129 360.258064516129 100.12903225806451 362.3225806451613 L 100.12903225806451 362.3225806451613 Z M 88.7741935483871 354.06451612903226 Q 88.7741935483871 356.1290322580645 91.87096774193549 358.19354838709677 Q 94.96774193548387 359.2258064516129 96 357.16129032258067 Q 97.03225806451613 355.0967741935484 93.93548387096774 353.03225806451616 Q 90.83870967741936 352 88.7741935483871 354.06451612903226 L 88.7741935483871 354.06451612903226 Z M 122.83870967741936 390.19354838709677 Q 120.7741935483871 393.2903225806452 123.87096774193549 397.4193548387097 Q 128 400.51612903225805 131.09677419354838 398.4516129032258 Q 132.1290322580645 395.35483870967744 129.03225806451613 391.2258064516129 Q 124.90322580645162 388.1290322580645 122.83870967741936 390.19354838709677 L 122.83870967741936 390.19354838709677 Z M 110.45161290322581 375.741935483871 Q 108.38709677419355 377.80645161290323 110.45161290322581 381.93548387096774 Q 113.54838709677419 385.03225806451616 116.64516129032258 384 Q 118.70967741935483 381.93548387096774 116.64516129032258 377.80645161290323 Q 113.54838709677419 373.6774193548387 110.45161290322581 375.741935483871 L 110.45161290322581 375.741935483871 Z" />
                  </svg>
                </a>
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p>GitHub</p>
            </Tooltip.Content>
          </Tooltip.Root>
          {/*dropdown gets it stuck, I wish there was a "disappear after x time"*/}
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div className="relative inline-flex">
                <ModeToggle />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p>Theme</p>
            </Tooltip.Content>
          </Tooltip.Root>
        </div>
      </div>
    </div>
  );
}
