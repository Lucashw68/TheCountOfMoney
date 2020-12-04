# Script release.sh

  - Major release:

    ```
    MUST be incremented if non-backward compatible changes are made to the public API.

    This MAY include minor changes and fixes at the same time.
    ```

  - Minor release:

    ```
    MUST be incremented if new backward compatible features are introduced in the public API.

    It MAY be incremented if new features or substantial improvements are introduced in the private code. It MAY include corrections at the same time.
    ```

  - Patch release

    ```
    MUST be incremented if only backward compatible fixes are introduced.

    A correction is defined as an internal change that corrects incorrect behavior.
    ```

  - Manual release

    ```
    MUST be in format X.X.X

    Manually set the release version
    ```

  Usage: ./release.sh [TYPE] [ADDITIONAL_TAG]
  OPTION:
    -h              display usage
    TYPE            major | minor | patch | manual
    ADDITIONAL_TAG  additional tag to concat with version (ex: alpha)
