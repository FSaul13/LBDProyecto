import { S2SettingsFormGeneratorModel } from './s2-settings-form-generator.model';

export class QuizSettingsModel{
    _id:string;

    _openQuestionTitle:string;
    _openQuestionDescription:string;

    _optionsUniqueQuestionTitle:string;
    _optionsUniqueQuestionDescription:string;

    _optionsMultipleQuestionTitle:string;
    _optionsMultipleQuestionDescription:string;

    _queryQuestionTitle:string;
    _queryQuestionDescription:string;

    _selectQuestionTitle:string;
    _selectQuestionDescription:string;

    _rankQuestionTitle:string;
    _rankQuestionDescription:string;

    _raitingQuestionTitle:string;
    _raitingQuestionDescription:string;

    _buttonSave:string;

    _translate:any;

    _questionPlanceholder:string;

    _addOption:string;

    _optionNotFoundError:string;
    _questionNotFoundError:string;
    _optionConfigError:string;
    _optionMultipleConfigError:string;
    _queryError:string;

    _modalInfoTitle:string;

    
    _queryModalDescription:string;
    _uniqueModalDescription:string;
    _multipleModalDescription:string;
    _openModalDescription:string;
    _selectModalDescription:string;
    _rankModalDescription:string;
    _raitingModalDescription:string;

    _tryqueryapi:string;

    _tryQueryButton:string;
    _tryQueryError:string;

    _resetOnSave:boolean;

    _form:S2SettingsFormGeneratorModel;
}