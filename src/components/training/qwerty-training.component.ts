import './training.scss';
import { TrainingKeysHtmlComponent } from './training-keys.component';
import { BaseTrainingHtmlComponent } from './base-training.component';
import { TrainingLesson } from './training-lesson.enum';
import { TrainingRowHtmlComponent } from './training-row.component';

export class QwertyTrainingHtmlComponent extends BaseTrainingHtmlComponent {
  getComponents(): TrainingKeysHtmlComponent[] {
    const res = [];
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_F_AND_J, 'FJ'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_D_AND_K, 'DK'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_FJDK, 'DFJK'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_S_AND_L, 'SL'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_A_AND_SEMI_COLON, 'A;'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_ASL_SEMI_COLON, 'ASL;'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_G_AND_H, 'GH'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_FGHJ, 'FGHJ'));
    // res.push(new TrainingRowHtmlComponent(TrainingLesson.HOME_ROW, 'Home'));

    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_R_AND_U, 'RU'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_E_AND_I, 'EI'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_ERUI, 'ERUI'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_W_AND_O, 'WO'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_Q_AND_P, 'QP'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_QWOP, 'QWOP'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_T_AND_Y, 'TY'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_RTYU, 'RTYU'));
    // res.push(new TrainingRowHtmlComponent(TrainingLesson.TOP_ROW, 'Top'));

    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_V_AND_M, 'VM'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_C_AND_COMMA, 'C,'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_CVM_COMMA, 'CVM,'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_X_AND_DOT, 'X.'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_Z_AND_SLASH, 'Z/'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_ZX_DOT_SLASH, 'ZX./'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_B_AND_N, 'BN'));
    res.push(new TrainingKeysHtmlComponent(TrainingLesson.KEYS_VBNM, 'VBNM'));
    // res.push(new TrainingRowHtmlComponent(TrainingLesson.BOTTOM_ROW, 'Bottom'));
    return res;
  }
}
