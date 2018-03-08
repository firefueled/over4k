import * as React from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import { localize, LocalizedProps } from '../utils/polyglothoc'

interface HandleChangeFunc {
  (locale: string): void
}

interface Props {
  handleChange: HandleChangeFunc,
  localeOptions: string[],
}

class LocaleSelector extends React.PureComponent<LocalizedProps<Props>> {
  render() {
    const { localeOptions, handleChange } = this.props
    return (
      <ButtonGroup size="sm">
        {localeOptions.map((option: string) =>
          <Button
            outline
            color="secondary"
            className="locale-selector"
            key={option}
            onClick={() => handleChange(option)}
          >
            {option}
          </Button>
        )}
      </ButtonGroup>
    )
  }
}

export default localize()(LocaleSelector)
