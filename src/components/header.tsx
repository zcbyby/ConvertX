export const Header = ({
  hideHistory,
  webroot = "",
}: {
  hideHistory?: boolean;
  webroot?: string;
}) => {
  return (
    <header class="w-full p-4">
      <nav class={`mx-auto flex max-w-4xl justify-between rounded-sm bg-neutral-900 p-4`}>
        <ul>
          <li>
            <strong>
              <a href={`${webroot}/`}>ConvertX</a>
            </strong>
          </li>
        </ul>
        <ul class="flex gap-4">
          {!hideHistory && (
            <li>
              <a
                class={`
                  text-accent-600 transition-all
                  hover:text-accent-500 hover:underline
                `}
                href={`${webroot}/history`}
              >
                History
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
