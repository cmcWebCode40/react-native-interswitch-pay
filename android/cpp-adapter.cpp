#include <jni.h>
#include "react-native-interswitch-pay.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_interswitchpay_InterswitchPayModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return interswitchpay::multiply(a, b);
}
