package com.stereokrauts.stereoscope.model.messaging.message.inputs.labels;

import com.stereokrauts.stereoscope.model.messaging.message.AbstractLabelMessage;

/** This function is called, when the value of an
 * element has been changed and therefore a new
 * value for the associated label has been sent.
 * @param int channel The input channel (Beginning at 0)
 * @param int identifier used for elements with more than one occurrence
 * @param String label New label string
 */
public class MsgChannelLevelLabel extends AbstractLabelMessage<String> {
	public MsgChannelLevelLabel(final int channel, final int identifier, final String label) {
		super(identifier, channel, label);
	}
}
