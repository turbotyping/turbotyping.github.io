import './training.scss';
import { TrainingKeysHtmlComponent } from './training-keys.component';
import { BaseTrainingHtmlComponent } from './base-training.component';
import { TrainingLesson } from './training-lesson.enum';
import { TrainingRowHtmlComponent } from './training-row.component';
import { TrainingLessonLevelHtmlComponent } from './training-lesson-level.component';

export class AzertyTrainingHtmlComponent extends BaseTrainingHtmlComponent {
  getComponents(): TrainingKeysHtmlComponent[] {
    const res = [];
    // res.push(new TrainingLessonLevelHtmlComponent('Level  1'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_F_AND_J, 'FJ'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_D_AND_K, 'DK'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_FJDK, 'DFJK'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_S_AND_L, 'SL'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_Q_AND_M, 'QM'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_QSLM, 'QSLM'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_G_AND_H, 'GH'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_FGHJ, 'FGHJ'));
    // res.push(new TrainingRowHtmlComponent(TrainingLesson.HOME_ROW, 'Home'));

    // res.push(new TrainingLessonLevelHtmlComponent('Level  2'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_R_AND_U, 'RU'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_E_AND_I, 'EI'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_ERUI, 'ERUI'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_Z_AND_O, 'ZO'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_A_AND_P, 'AP'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_AZOP, 'AZOP'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_T_AND_Y, 'TY'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_RTYU, 'RTYU'));
    // res.push(new TrainingRowHtmlComponent(TrainingLesson.TOP_ROW, 'Top'));

    // res.push(new TrainingLessonLevelHtmlComponent('Level  3'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_V_AND_COMMA, 'V,'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_C_AND_SEMI_COLON, 'C;'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_CV_COMMA_SEMI_COLON, 'CV,;'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_X_AND_COLON, 'X:'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_W_AND_EX, 'W!'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_WX_COLON_EX, 'WX:!'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_B_AND_N, 'BN'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_VBN_COMMA, 'VBN,'));
    // res.push(new TrainingRowHtmlComponent(TrainingLesson.BOTTOM_ROW, 'Bottom'));
    return res;
  }
}
