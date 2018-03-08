import * as React from 'react'
import * as Polyglot from 'node-polyglot'

export type TranslateFunc = (key: string) => string
export type LocalizedProps<P> = LocalizationProps & P & any
type MissingFunc = (key: string) => string

interface LocalizationProps {
  t: TranslateFunc,
  replace: (obj: object) => void,
  k: LocaleKeys,
}

export interface LocaleKeys {
  [key: string]: string
}

let polyglot: Polyglot
let k: LocaleKeys = {}
const defaultMissingFunc: MissingFunc = (key: string) =>
  `[translation for ${key} is missing]`

export default class PolyglotHOC extends Polyglot {
  static init(
    strings: LocaleKeys,
    onMissingKey: MissingFunc = defaultMissingFunc): void {

      PolyglotHOC.extractKeys(strings)
      polyglot = new Polyglot({
        phrases: strings,
        allowMissing: true,
        onMissingKey: onMissingKey
      })
  }

  private static extractKeys(strings: object) {
    Object.keys(strings).forEach(key => {
      k[key] = key
    })
  }
}

function t(key: string, secondParam?: number | Polyglot.InterpolationOptions) {
  checkInstance()
  if (secondParam) {
    // explicitly defines second parameter type for the compiler
    if (typeof secondParam === 'number')
      return polyglot.t(key, secondParam)
    else
      return polyglot.t(key, secondParam)
  }
  return polyglot.t(key)
}

function checkInstance() {
  if (polyglot == null)
    throw new Error('PolyglotHOC was never initialized\
      Please call init(stringsObject, defaultLocale) first')
}

export function localize() {
  return function <P extends LocalizationProps>
    (WrappedComponent: React.ComponentType<P>):
    React.ComponentClass<LocalizedProps<P>> {
      class LocalizedComponent extends React.Component<P> {
        constructor(props: P) {
          super(props)
          this.replace = this.replace.bind(this)
        }

        replace(strings: LocaleKeys) {
          checkInstance()
          polyglot.replace(strings)
          this.forceUpdate()
        }

        render() {
          return (
            <WrappedComponent
              {...this.props}
              {...this.state}
              k={k}
              t={t}
              replace={this.replace}
            />
          )
        }
      }
      return LocalizedComponent
  }
}
