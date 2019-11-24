---
title: "Xcode 7 and the CircleCI"
date: 2015-10-20
---

We're using CircleCI for one of our iOS projects and recently we migrated to Xcode 7. However, since the migration we noticed that the builds on CircleCI started to fail. Even worse, all tests were passing locally in Xcode.

The error we got on CircleCi was:

`Unable to read build settings for target 'MyProjectTests'. It's likely that the scheme references a non-existent target.`

... (output supressed)

STDERR: xcodebuild: error: The test action requires that the name of a scheme in the project is provided using the "-scheme" option. The "-list" option can be used to find the names of the schemes in the project.

We're using the Facebook's [xctool](https://github.com/facebook/xctool) to run the build and the tests on the CI. The command looks like:

`xctool -reporter pretty -reporter junit:~/Desktop/xcode/results.xml -reporter plain:~/Desktop/xctool.log CODE_SIGNING_REQUIRED=NO CODE_SIGN_IDENTITY= PROVISIONING_PROFILE= -destination 'platform=iOS Simulator,name=iPhone 6,OS=9.0' -sdk iphonesimulator -project 'MyProject.xcodeproj' -scheme "MyProject" build build-tests run-tests`

How do you run it on your Mac? First make sure you install xctool via homebrew. `brew update brew install xctool`

Then run the xctool command above and see what happens. In our case everything went well locally, the tool succeeded to build and the tests were green as expected.

Still, the CircleCI was red. We noticed that there was a different version of xctool installed on the CI. The version the CI was using was 0.2.2 and the version installed via homebrew on the local machines reported 0.2.6.

The fix: add a dependency in the circle.yml to preinstall the latest version of xctool.

Our circle.yml looks like below and the build is green. Happy testing!

https://gist.github.com/luciancancescu/c183d96245e074bfa9c1
